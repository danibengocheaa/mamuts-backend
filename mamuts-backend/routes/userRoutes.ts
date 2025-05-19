import { Router } from 'express';
import { createUser, deleteUser, getUsers, updateUser, login, register, getUserByToken } from '../controllers/userController';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/getUser', getUsers);
router.post('/create', createUser);
router.put('/update/:id', upload.single('image'), updateUser); // Manejar la subida de archivos
router.delete('/delete/:id', deleteUser);
router.post('/login', login);
router.post('/register', register);
router.get('/getProfile', getUserByToken);

export default router;