"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.get('/getUser', userController_1.getUsers);
router.post('/create', userController_1.createUser);
router.put('/update/:id', upload.single('image'), userController_1.updateUser); // Manejar la subida de archivos
router.delete('/delete/:id', userController_1.deleteUser);
router.post('/login', userController_1.login);
router.post('/register', userController_1.register);
router.get('/getProfile', userController_1.getUserByToken);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map