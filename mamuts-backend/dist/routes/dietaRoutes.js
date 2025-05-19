"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dietaController_1 = require("../controllers/dietaController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Ruta pública
router.get('/getDietes', dietaController_1.getDietes);
router.post('/create', upload.single('image'), dietaController_1.createDieta);
router.put('/update/:id', upload.single('image'), dietaController_1.updateDieta);
router.delete('/delete/:id', dietaController_1.deleteDieta);
exports.default = router;
//# sourceMappingURL=dietaRoutes.js.map