// src/database/seeders/dietaSeeder.ts
import Dieta from '../../models/dieta';

export const seedDietas = async () => {
  const dietas = [
    {
      usuari_id: 1,
      nom: 'Dieta de volumen',
      descripcio: 'Dieta alta en calorías para ganar masa muscular',
      calories: 3000,
      image: null
    },
    {
      usuari_id: 1,
      nom: 'Dieta de definición',
      descripcio: 'Dieta para perder grasa manteniendo músculo',
      calories: 2200,
      image: null
    },
    {
      usuari_id: 2,
      nom: 'Dieta equilibrada',
      descripcio: 'Dieta para mantenimiento',
      calories: 2500,
      image: null
    }
  ];

  await Dieta.bulkCreate(dietas);
  console.log('✅ Dietas seeded');
};