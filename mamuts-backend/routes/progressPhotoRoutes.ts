// routes/progressPhotoRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { uploadProgressPhoto, getProgressPhotosByUserId } from '../controllers/progressPhotoController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/user/:userId', getProgressPhotosByUserId); // ruta para obtener todas las fotos de un usuario
router.post('/upload', upload.single('image'), uploadProgressPhoto);

export default router;
