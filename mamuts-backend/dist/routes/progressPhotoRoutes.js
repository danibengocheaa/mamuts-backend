"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/progressPhotoRoutes.ts
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const progressPhotoController_1 = require("../controllers/progressPhotoController");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.get('/user/:userId', progressPhotoController_1.getProgressPhotosByUserId); // ruta para obtener todas las fotos de un usuario
router.post('/upload', upload.single('image'), progressPhotoController_1.uploadProgressPhoto);
exports.default = router;
//# sourceMappingURL=progressPhotoRoutes.js.map