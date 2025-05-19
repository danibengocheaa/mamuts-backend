"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exerciciController_1 = require("../controllers/exerciciController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Rutas para obtener todos los ejercicios
router.get('/getExercici', exerciciController_1.getExercises);
router.get("/getExercises", exerciciController_1.getExercises);
// Solo admin puede crear, actualizar o eliminar ejercicios
router.post('/create', upload.single('image'), exerciciController_1.createExercise); // Solo admin
router.put('/update/:id', upload.single('image'), exerciciController_1.updateExercise); // Solo admin
router.delete('/delete/:id', exerciciController_1.deleteExercise); // Solo admin
exports.default = router;
//# sourceMappingURL=exerciciRoutes.js.map