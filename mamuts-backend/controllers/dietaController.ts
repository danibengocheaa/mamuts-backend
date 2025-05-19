import { Request, Response } from 'express';
import Dieta from '../models/dieta'; // Asegúrate de importar el modelo Dieta correctamente
import { Sequelize } from "sequelize";
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
  // Obtener todas las dietas
  export const getDietes = async (req: Request, res: Response): Promise<any> => {
    try {
      const dietes = await Dieta.findAll();
  
      const dietesWithImages = await Promise.all(
        dietes.map(async (dieta) => {
          const dietaData = dieta.get({ plain: true });
          let imageBase64 = null;
          const imagePathBuffer = dieta.get('image'); // Puede ser Buffer o string
  
          // Convertir Buffer a string si es necesario
          const imagePath = Buffer.isBuffer(imagePathBuffer) 
            ? imagePathBuffer.toString('utf-8') 
            : String(imagePathBuffer);
  
          if (imagePath && imagePath.trim() !== '') {
            try {
              // Limpiar la ruta y construir path correcto
              const cleanPath = imagePath.replace(/^uploads[\\/]/, '');
              
              // Posibles ubicaciones de imágenes (src y dist)
              const possiblePaths = [
                path.join(process.cwd(), 'uploads', cleanPath),
                path.join(__dirname, '..', '..', 'uploads', cleanPath),
                path.join(__dirname, '..', '..', 'src', 'uploads', cleanPath),
                path.join(__dirname, '..', 'uploads', cleanPath) // Ruta adicional común
              ];
  
              // Buscar la imagen en las posibles ubicaciones
              for (const fullPath of possiblePaths) {
                if (fs.existsSync(fullPath)) {
                  const imageBuffer = fs.readFileSync(fullPath);
                  imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
                  break;
                }
              }
  
              if (!imageBase64) {
                console.warn(`Imagen no encontrada para dieta ${dietaData.dieta_id} en ninguna ruta:`, possiblePaths);
              }
            } catch (error) {
              console.error(`Error procesando imagen para dieta ${dietaData.dieta_id}:`, error);
            }
          }
  
          return {
            ...dietaData,
            imageUrl: imageBase64,
            imagePath: imagePath,
            imagePathBuffer: Buffer.isBuffer(imagePathBuffer) ? '[Buffer]' : null
          };
        })
      );
  
      res.json(dietesWithImages);
      console.log(dietesWithImages);
    } catch (error) {
      console.error('Error fetching dietas:', error);
      res.status(500).json({
        msg: 'Error al obtener las dietas. Por favor, contacta al administrador.',
      });
    }
  };
  export const createDieta = async (req: Request, res: Response): Promise<any> => {
    const { nom, descripcio, calories, usuari_id, observacions } = req.body;
  
    try {
      // Verificar campos obligatorios
      if (!nom || !descripcio || !calories || !usuari_id) {
        return res.status(400).json({ 
          success: false,
          msg: 'Faltan campos obligatorios: nom, descripcio, calories, usuari_id' 
        });
      }

      // Validar que calories sea un número
      if (isNaN(Number(calories))) {
        return res.status(400).json({
          success: false,
          msg: 'El campo calories debe ser un número válido'
        });
      }
  
      // Crear objeto de dieta
      const dietaData = {
        nom,
        descripcio,
        calories: parseFloat(calories), // Convertir a número decimal
        usuari_id: parseInt(usuari_id), // Convertir a entero
        observacions: observacions || null, // Campo opcional
        image: req.file?.path || null // Manejo de imagen (opcional)
      };
  
      // Crear la nueva dieta
      const newDieta = await Dieta.create(dietaData);
      
      res.status(201).json({
        success: true,
        data: newDieta
      });
      
    } catch (error) {
      console.error('Error creating dieta:', error);
      res.status(500).json({
        success: false,
        msg: 'Error al crear la dieta. Por favor, contacta al administrador',
      });
    }
};

export const updateDieta = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log('Archivo recibido:', req.file);
    console.log('Datos del cuerpo:', req.body);

    const dieta = await Dieta.findByPk(req.params.id);
    if (!dieta) {
      return res.status(404).json({ error: 'Dieta no encontrada' });
    }

    // Validar campos obligatorios
    if (!req.body.nom || !req.body.descripcio || !req.body.calories || !req.body.usuari_id) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Preparar datos de actualización
    const updateData: any = {
      nom: req.body.nom,
      descripcio: req.body.descripcio,
      calories: parseFloat(req.body.calories),
      usuari_id: parseInt(req.body.usuari_id)
    };

    // Manejo de imágenes mejorado
    if (req.body.remove_image === 'true') {
      // Eliminar imagen anterior si existe
      if (dieta.image) {
        try {
          const fullPath = path.join(process.cwd(), dieta.image);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log('Imagen eliminada:', fullPath);
          }
        } catch (err) {
          console.error('Error al eliminar imagen:', err);
        }
      }
      updateData.image = null;
    } 
    else if (req.file) {
      // Eliminar imagen anterior si existe
      if (dieta.image) {
        try {
          const fullPath = path.join(process.cwd(), dieta.image);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        } catch (err) {
          console.error('Error al eliminar imagen anterior:', err);
        }
      }
      updateData.image = req.file.path;
    }

    else {
      // Mantener imagen existente si no se especifica lo contrario
      updateData.image = dieta.image;
    }

    // Actualizar la dieta
    const [affectedCount] = await Dieta.update(updateData, {
      where: { dieta_id: req.params.id }
    });

    if (affectedCount === 0) {
      return res.status(404).json({ error: 'Dieta no encontrada' });
    }

    // Obtener y devolver la dieta actualizada
    const dietaActualizada = await Dieta.findByPk(req.params.id);
    return res.json(dietaActualizada);

  } catch (error) {
    console.error('Error al actualizar dieta:', error);
    return res.status(500).json({ 
      error: 'Error al actualizar dieta',
    });
  }
};
// Eliminar una dieta
export const deleteDieta = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    // Verificar si la dieta existe antes de intentar eliminarla
    const dieta = await Dieta.findByPk(id);
    if (!dieta) {
      return res.status(404).json({
        msg: `No diet found with the id ${id}`,
      });
    }

    // Eliminar la dieta
    await dieta.destroy();
    
    // Responder con mensaje de éxito
    res.json({
      msg: `Diet with id ${id} deleted successfully`,
    });
  } catch (error) {
    // Mostrar error en consola para depuración
    console.error('Error deleting dieta:', error);
    
    // Responder con mensaje genérico de error
    res.status(500).json({
      msg: 'Talk to the administrator',
    });
  }
};