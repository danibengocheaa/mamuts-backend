"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByToken = exports.register = exports.login = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const saltRounds = 10;
// Configuración de multer para la subida de archivos
const storage = multer_1.default.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
// Obtener todos los usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator',
        });
    }
});
exports.getUsers = getUsers;
// Crear un nuevo usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { password } = body;
    try {
        const user = yield user_1.default.findOne({
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
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield user_1.default.create(Object.assign(Object.assign({}, body), { password: hashedPassword }));
        res.json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator',
        });
    }
});
exports.createUser = createUser;
// Actualizar un usuario
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `There is no user with the id ${id}`,
            });
        }
        else {
            // Si hay un archivo en la solicitud, actualiza la ruta de la imagen
            if (req.file) {
                body.image = req.file.path;
            }
            yield user.update(body);
            res.json(user);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator',
        });
    }
});
exports.updateUser = updateUser;
// Eliminar un usuario
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `There is no user with the id ${id}`,
            });
        }
        else {
            yield user.destroy();
            res.json(user);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator',
        });
    }
});
exports.deleteUser = deleteUser;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Buscar el usuario en la base de datos
        const user = yield user_1.default.findOne({
            where: { nomUsuari: username },
        });
        if (!user) {
            return res.status(400).json({ message: 'Usuari no trobat' });
        }
        // Comparar la contraseña introducida con la almacenada en la base de datos
        const match = yield bcryptjs_1.default.compare(password, user.get('password'));
        if (!match) {
            return res.status(400).json({ message: 'Contrasenya incorrecta' });
        }
        // Generar un token JWT con los datos del usuario
        const token = jsonwebtoken_1.default.sign({ userId: user.get('id'), username: user.get('nomUsuari') }, JWT_SECRET, { expiresIn: '1h' } // Expira en 1 hora
        );
        // Enviar el token al frontend
        return res.status(200).json({
            message: 'Login exitós',
            token, // Ahora sí devuelves el token
            user: { id: user.get('usuari_id'), username: user.get('nomUsuari'), rol: user.get('rol') } // Opcional, puedes enviar datos del usuario
        });
    }
    catch (err) {
        console.error('Error al login:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});
exports.login = login;
// Registrar
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existingUser = yield user_1.default.findOne({
            where: { nomUsuari: username },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'El nom d\'usuari ja existeix' });
        }
        // Hashear la contraseña antes de almacenarla
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        // Crear el nuevo usuario con rol por defecto "usuari"
        const newUser = yield user_1.default.create({
            nomUsuari: username,
            password: hashedPassword,
            email,
            rol: 'usuari' // Asigna el rol por defecto aquí
        });
        return res.status(201).json({
            message: 'Usuari registrat correctament',
            user: newUser,
        });
    }
    catch (err) {
        console.error('Error al registrar:', err);
        return res.status(500).json({ error: `Error al registrar: ${err.message}` });
    }
});
exports.register = register;
// Obtener usuario por token
const getUserByToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Obtener el token del encabezado de autorización
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    try {
        // Verificar y decodificar el token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log('Decoded token:', decoded);
        // Buscar el usuario en la base de datos
        const user = yield user_1.default.findOne({ where: { nomUsuari: decoded.username } });
        if (!user) {
            return res.status(404).json({ message: 'Usuari no trobat' });
        }
        // Verificar si la imagen está definida y convertirla a base64
        let imageBase64 = null;
        const imagePath = user.get('image');
        if (String(imagePath).trim() !== '') {
            try {
                const imageBuffer = fs_1.default.readFileSync(String(imagePath));
                imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
            }
            catch (error) {
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
    }
    catch (err) {
        console.error('Error al obtener usuario por token:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});
exports.getUserByToken = getUserByToken;
//# sourceMappingURL=userController.js.map