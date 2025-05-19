import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const saltRounds = 10;

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk to the administrator',
    });
  }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { body } = req;
  const { password } = body;

  try {
    const user = await User.findOne({
      where: {
        nomUsuari: body.nomUsuari,
      },
    });
    if (user) {
      return res.status(400).json({
        msg: 'The user already exists',
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...body,
      password: hashedPassword,
    });
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk to the administrator',
    });
  }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: `There is no user with the id ${id}`,
      });
    } else {
      // Si hay un archivo en la solicitud, actualiza la ruta de la imagen
      if (req.file) {
        body.image = req.file.path;
      }
      await user.update(body);
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk to the administrator',
    });
  }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: `There is no user with the id ${id}`,
      });
    } else {
      await user.destroy();
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk to the administrator',
    });
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({
      where: { nomUsuari: username },
    });

    if (!user) {
      return res.status(400).json({ message: 'Usuari no trobat' });
    }

    // Comparar la contraseña introducida con la almacenada en la base de datos
    const match = await bcrypt.compare(password, user.get('password') as string);

    if (!match) {
      return res.status(400).json({ message: 'Contrasenya incorrecta' });
    }

    // Generar un token JWT con los datos del usuario
    const token = jwt.sign(
      { userId: user.get('id'), username: user.get('nomUsuari') },
      JWT_SECRET,
      { expiresIn: '1h' } // Expira en 1 hora
    );

    // Enviar el token al frontend
    return res.status(200).json({
      message: 'Login exitós',
      token, // Ahora sí devuelves el token
      user: { id: user.get('usuari_id'), username: user.get('nomUsuari'), rol: user.get('rol') } // Opcional, puedes enviar datos del usuario
    });

  } catch (err) {
    console.error('Error al login:', err);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Registrar
export const register = async (req: Request, res: Response): Promise<any> => {
  const { username, password, email } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      where: { nomUsuari: username },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'El nom d\'usuari ja existeix' });
    }

    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el nuevo usuario con rol por defecto "usuari"
    const newUser = await User.create({
      nomUsuari: username,
      password: hashedPassword,
      email,
      rol: 'usuari'  // Asigna el rol por defecto aquí
    });

    return res.status(201).json({
      message: 'Usuari registrat correctament',
      user: newUser,
    });

  } catch (err) {
    console.error('Error al registrar:', err);
    return res.status(500).json({ error: `Error al registrar: ${(err as Error).message}` });
  }
};

// Obtener usuario por token
  export const getUserByToken = async (req: Request, res: Response): Promise<any> => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado de autorización
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
      // Verificar y decodificar el token
      const decoded: any = jwt.verify(token, JWT_SECRET);
      console.log('Decoded token:', decoded);

      // Buscar el usuario en la base de datos
      const user = await User.findOne({ where: { nomUsuari: decoded.username } });
      
      if (!user) {
        return res.status(404).json({ message: 'Usuari no trobat' });
      }

      // Verificar si la imagen está definida y convertirla a base64
      let imageBase64 = null;
      const imagePath = user.get('image');
      if (String(imagePath).trim() !== '') {
        try {
          const imageBuffer = fs.readFileSync(String(imagePath));
          imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
        } catch (error) {
          console.error('Error al leer la imagen:', error);
          imageBase64 = null;
        }
      }
      

      // Enviar los datos del usuario al frontend, incluyendo la imagen en base64
      return res.status(200).json({
        message: 'Usuari trobat',
        user: {
          id: user.get('usuari_id'),
          nomUsuari: user.get('nomUsuari'),
          email: user.get('email'),
          telefon: user.get('telefon'),
          altura: user.get('altura'),
          pes: user.get('pes'),
          sexe: user.get('sexe'),
          dataNaix: user.get('dataNaix'),
          rol: user.get('rol'),
          image: imageBase64, // Devolver la imagen en base64
        },
      });

    } catch (err) {
      console.error('Error al obtener usuario por token:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  };
  