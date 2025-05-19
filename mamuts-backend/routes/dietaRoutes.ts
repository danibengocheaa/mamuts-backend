import { Router } from 'express';
import { getDietes, createDieta, updateDieta, deleteDieta } from '../controllers/dietaController';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Ruta pública
router.get('/getDietes', getDietes);

router.post('/create', upload.single('image'), createDieta);
router.put('/update/:id', upload.single('image'), updateDieta);
router.delete('/delete/:id', deleteDieta);

export default router;