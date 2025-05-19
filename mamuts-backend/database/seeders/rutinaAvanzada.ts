import Exercici from "../../models/exercici";
import RutinaDay from "../../models/rutinaDay";
import Rutina from "../../models/rutines";
import { Model } from "sequelize";

export const seedRutinaAvanzada = async () => {
  // Check if routine already exists
  let rutina = await Rutina.findOne({ where: { nom: 'Powerbuilding Avanzado' } }) as Model & { rutina_id: number };

  if (!rutina) {
    console.log('📥 Creando Powerbuilding Avanzado...');
    rutina = await Rutina.create({
      nom: 'Powerbuilding Avanzado',
      descripcio: 'Combinación de fuerza e hipertrofia 5 días/semana',
      is_predefined: true,
      difficulty: 'Avanzado',
      duration_weeks: 16,
      usuari_id: 1
    }) as Model & { rutina_id: number };
  } else {
    console.log('ℹ️ Powerbuilding Avanzado ya existe, omitiendo creación.');
  }

  // Buscar ejercicios existentes creados por exerciciSeeder.ts
  const exercicis = await Promise.all([
    Exercici.findOne({ where: { nom: 'Sentadilla Frontal' } }),
    Exercici.findOne({ where: { nom: 'Prensa Inclinada 45°' } }),
    Exercici.findOne({ where: { nom: 'Press Declinado con Barra' } }),
    Exercici.findOne({ where: { nom: 'Arnold Press' } }),
    Exercici.findOne({ where: { nom: 'Peso Muerto Convencional' } }),
    Exercici.findOne({ where: { nom: 'Dominadas Pronas' } }),
    Exercici.findOne({ where: { nom: 'Press Inclinado con Mancuernas' } }),
    Exercici.findOne({ where: { nom: 'Fondos en Paralelas con Peso' } }),
    Exercici.findOne({ where: { nom: 'Bulgarian Split Squat' } }),
    Exercici.findOne({ where: { nom: 'Face Pulls' } })
  ]) as (Model & { exercici_id: number })[];

  // Verificar que todos los ejercicios existan
  if (exercicis.some(ex => !ex)) {
    throw new Error('Algunos ejercicios no se encontraron en la base de datos');
  }

  // Check if RutinaDay entries already exist for this rutina_id
  const existingDays = await RutinaDay.count({ where: { rutina_id: rutina.rutina_id } });
  if (existingDays > 0) {
    console.log('ℹ️ RutinaDays para Powerbuilding Avanzado ya existen, omitiendo creación.');
    return;
  }

  await RutinaDay.bulkCreate([
    // Día 1 (Lunes - Fuerza Lower)
    { rutina_id: rutina.rutina_id, day_name: 'Lunes', exercici_id: exercicis[0].exercici_id, sets: 5, reps: '5', notes: '@85%RM' },
    { rutina_id: rutina.rutina_id, day_name: 'Lunes', exercici_id: exercicis[1].exercici_id, sets: 4, reps: '8-10' },
    
    // Día 2 (Martes - Fuerza Upper)
    { rutina_id: rutina.rutina_id, day_name: 'Martes', exercici_id: exercicis[2].exercici_id, sets: 5, reps: '3', notes: '@90%RM' },
    { rutina_id: rutina.rutina_id, day_name: 'Martes', exercici_id: exercicis[3].exercici_id, sets: 4, reps: '6' },
    
    // Día 3 (Jueves - Hipertrofia Back)
    { rutina_id: rutina.rutina_id, day_name: 'Jueves', exercici_id: exercicis[4].exercici_id, sets: 4, reps: '6' },
    { rutina_id: rutina.rutina_id, day_name: 'Jueves', exercici_id: exercicis[5].exercici_id, sets: 4, reps: '6' },
    
    // Día 4 (Viernes - Hipertrofia Upper)
    { rutina_id: rutina.rutina_id, day_name: 'Viernes', exercici_id: exercicis[6].exercici_id, sets: 4, reps: '8-10' },
    { rutina_id: rutina.rutina_id, day_name: 'Viernes', exercici_id: exercicis[7].exercici_id, sets: 4, reps: '8' },
    
    // Día 5 (Sábado - Accesorios)
    { rutina_id: rutina.rutina_id, day_name: 'Sábado', exercici_id: exercicis[8].exercici_id, sets: 3, reps: '8/leg' },
    { rutina_id: rutina.rutina_id, day_name: 'Sábado', exercici_id: exercicis[9].exercici_id, sets: 4, reps: '15' }
  ]);

  console.log(`✅ Powerbuilding Avanzado creada con ID ${rutina.rutina_id}`);
};