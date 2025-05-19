import { Router } from 'express';
import { createExercise, deleteExercise, getExercises, updateExercise } from '../controllers/exerciciController';
import multer from 'multer';
import { checkAdmin } from '../middleware/checkAdmin';  // Importamos el middleware checkAdmin

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Rutas para obtener todos los ejercicios
router.get('/getExercici', getExercises);
router.get("/getExercises", getExercises)

// Solo admin puede crear, actualizar o eliminar ejercicios
router.post('/create', upload.single('image'), createExercise); // Solo admin
router.put('/update/:id', upload.single('image'), updateExercise); // Solo admin
router.delete('/delete/:id', deleteExercise); // Solo admin

export default router;
