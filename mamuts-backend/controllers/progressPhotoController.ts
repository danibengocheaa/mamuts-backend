// controllers/progressPhotosController.ts
import { Request, Response } from 'express';
import ProgressPhoto from '../models/progress_photos';
import fs from 'fs';
import path from 'path';
import { Op, Sequelize } from 'sequelize';

export const uploadProgressPhoto = async (req: Request, res: Response): Promise<void> => {
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
    const existing = await ProgressPhoto.findOne({
      where: {
        userId,
        [Op.and]: [
          Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "createdAt"')), currentMonth),
          Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "createdAt"')), currentYear)
        ]
      },
    });

    if (existing) {
      fs.unlinkSync(image.path);
      res.status(409).json({ message: 'Ja tens una foto aquest mes' });
      return;
    }

    const newPhoto = await ProgressPhoto.create({
      userId,
      imageUrl: path.join('uploads', image.filename),
      month: `${currentYear}-${String(currentMonth).padStart(2, '0')}`,
    });
    

    res.status(201).json({ 
      message: 'Foto pujada correctament', 
      photo: {
        ...newPhoto.toJSON(),
        month: `${currentYear}-${String(currentMonth).padStart(2, '0')}`
      }
    });
  } catch (error) {
    console.error(error);
    if (image?.path) fs.unlinkSync(image.path);
    res.status(500).json({ message: 'Error en pujar la foto' });
  }
};
export const getProgressPhotosByUserId = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const photos = await ProgressPhoto.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']], // Ordenar por fecha descendente
    });

    if (photos.length === 0) {
      res.status(404).json({ message: 'No s\'han trobat fotos per aquest usuari' });
      return;
    }

    // Convertir cada foto a Base64
    const photosWithBase64 = await Promise.all(photos.map(async (photo) => {
      const photoPath = path.resolve(process.cwd(), photo.get('imageUrl') as string);

      try {
        // Leer el archivo de la imagen
        const imageBuffer = fs.readFileSync(photoPath);

        // Convertir la imagen a Base64
        const base64Image = imageBuffer.toString('base64');
        
        // Devolver la foto con la cadena Base64
        return {
          ...photo.toJSON(),
          base64Image: `data:image/jpeg;base64,${base64Image}`, // Cambia el tipo MIME si es necesario
        };
      } catch (error) {
        console.error('Error al leer la imagen:', error);
        return {
          ...photo.toJSON(),
          base64Image: null,
        };
      }
    }));
    res.status(200).json(photosWithBase64);
  } catch (error) {
    console.error('Error al obtenir les fotos del usuari:', error);
    res.status(500).json({ message: 'Error al obtenir les fotos' });
  }
};

