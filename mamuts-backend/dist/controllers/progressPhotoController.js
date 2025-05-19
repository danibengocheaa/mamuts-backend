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
exports.getProgressPhotosByUserId = exports.uploadProgressPhoto = void 0;
const progress_photos_1 = __importDefault(require("../models/progress_photos"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const uploadProgressPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const image = req.file;
    if (!userId || !image) {
        res.status(400).json({ message: 'Falten dades' });
        return;
    }
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 1-12
    const currentYear = currentDate.getFullYear();
    try {
        // Versión corregida para PostgreSQL
        const existing = yield progress_photos_1.default.findOne({
            where: {
                userId,
                [sequelize_1.Op.and]: [
                    sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('EXTRACT', sequelize_1.Sequelize.literal('MONTH FROM "createdAt"')), currentMonth),
                    sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn('EXTRACT', sequelize_1.Sequelize.literal('YEAR FROM "createdAt"')), currentYear)
                ]
            },
        });
        if (existing) {
            fs_1.default.unlinkSync(image.path);
            res.status(409).json({ message: 'Ja tens una foto aquest mes' });
            return;
        }
        const newPhoto = yield progress_photos_1.default.create({
            userId,
            imageUrl: path_1.default.join('uploads', image.filename),
            month: `${currentYear}-${String(currentMonth).padStart(2, '0')}`,
        });
        res.status(201).json({
            message: 'Foto pujada correctament',
            photo: Object.assign(Object.assign({}, newPhoto.toJSON()), { month: `${currentYear}-${String(currentMonth).padStart(2, '0')}` })
        });
    }
    catch (error) {
        console.error(error);
        if (image === null || image === void 0 ? void 0 : image.path)
            fs_1.default.unlinkSync(image.path);
        res.status(500).json({ message: 'Error en pujar la foto' });
    }
});
exports.uploadProgressPhoto = uploadProgressPhoto;
const getProgressPhotosByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const photos = yield progress_photos_1.default.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']], // Ordenar por fecha descendente
        });
        if (photos.length === 0) {
            res.status(404).json({ message: 'No s\'han trobat fotos per aquest usuari' });
            return;
        }
        // Convertir cada foto a Base64
        const photosWithBase64 = yield Promise.all(photos.map((photo) => __awaiter(void 0, void 0, void 0, function* () {
            const photoPath = path_1.default.resolve(process.cwd(), photo.get('imageUrl'));
            try {
                // Leer el archivo de la imagen
                const imageBuffer = fs_1.default.readFileSync(photoPath);
                // Convertir la imagen a Base64
                const base64Image = imageBuffer.toString('base64');
                // Devolver la foto con la cadena Base64
                return Object.assign(Object.assign({}, photo.toJSON()), { base64Image: `data:image/jpeg;base64,${base64Image}` });
            }
            catch (error) {
                console.error('Error al leer la imagen:', error);
                return Object.assign(Object.assign({}, photo.toJSON()), { base64Image: null });
            }
        })));
        res.status(200).json(photosWithBase64);
    }
    catch (error) {
        console.error('Error al obtenir les fotos del usuari:', error);
        res.status(500).json({ message: 'Error al obtenir les fotos' });
    }
});
exports.getProgressPhotosByUserId = getProgressPhotosByUserId;
//# sourceMappingURL=progressPhotoController.js.map