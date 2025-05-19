import Exercici from "../../models/exercici";
import RutinaDay from "../../models/rutinaDay";
import Rutina from "../../models/rutines";
import { Model } from "sequelize";

export const seedRutinaIntermedia = async () => {
  // Check if routine already exists
  let rutina = await Rutina.findOne({ where: { nom: 'Rutina PPL Intermedia' } }) as Model & { rutina_id: number };

  if (!rutina) {
    console.log('📥 Creando Rutina PPL Intermedia...');
    rutina = await Rutina.create({
      nom: 'Rutina PPL Intermedia',
      descripcio: 'Push/Pull/Legs 6 días/semana',
      is_predefined: true,
      difficulty: 'Intermedio',
      duration_weeks: 12,
      usuari_id: 1
    }) as Model & { rutina_id: number };
  } else {
    console.log('ℹ️ Rutina PPL Intermedia ya existe, omitiendo creación.');
  }

  // Buscar ejercicios existentes creados por exerciciSeeder.ts
  const exercicis = await Promise.all([
    Exercici.findOne({ where: { nom: 'Press Inclinado con Mancuernas' } }),
    Exercici.findOne({ where: { nom: 'Elevaciones Laterales' } }),
    Exercici.findOne({ where: { nom: 'Fondos en Banco' } }),
    Exercici.findOne({ where: { nom: 'Peso Muerto Convencional' } }),
    Exercici.findOne({ where: { nom: 'Dominadas Pronas' } }),
    Exercici.findOne({ where: { nom: 'Remo con Barra' } }),
    Exercici.findOne({ where: { nom: 'Sentadilla Frontal' } }),
    Exercici.findOne({ where: { nom: 'Bulgarian Split Squat' } }),
    Exercici.findOne({ where: { nom: 'Peso Muerto Rumano' } })
  ]) as (Model & { exercici_id: number })[];

  // Verificar que todos los ejercicios existan
  if (exercicis.some(ex => !ex)) {
    throw new Error('Algunos ejercicios no se encontraron en la base de datos');
  }

  // Check if RutinaDay entries already exist for this rutina_id
  const existingDays = await RutinaDay.count({ where: { rutina_id: rutina.rutina_id } });
  if (existingDays > 0) {
    console.log('ℹ️ RutinaDays para Rutina PPL Intermedia ya existen, omitiendo creación.');
    return;
  }

  await RutinaDay.bulkCreate([
    // Push (Lunes/Jueves)
    { rutina_id: rutina.rutina_id, day_name: 'Lunes', exercici_id: exercicis[0].exercici_id, sets: 4, reps: '6-8' },
    { rutina_id: rutina.rutina_id, day_name: 'Lunes', exercici_id: exercicis[1].exercici_id, sets: 4, reps: '6-8' },
    { rutina_id: rutina.rutina_id, day_name: 'Lunes', exercici_id: exercicis[2].exercici_id, sets: 3, reps: '8-10' },
    
    // Pull (Martes/Viernes)
    { rutina_id: rutina.rutina_id, day_name: 'Martes', exercici_id: exercicis[3].exercici_id, sets: 4, reps: '5' },
    { rutina_id: rutina.rutina_id, day_name: 'Martes', exercici_id: exercicis[4].exercici_id, sets: 4, reps: '6-8' },
    { rutina_id: rutina.rutina_id, day_name: 'Martes', exercici_id: exercicis[5].exercici_id, sets: 3, reps: '8-10' },
    
    // Legs (Miércoles/Sábado)
    { rutina_id: rutina.rutina_id, day_name: 'Miércoles', exercici_id: exercicis[6].exercici_id, sets: 4, reps: '6-8' },
    { rutina_id: rutina.rutina_id, day_name: 'Miércoles', exercici_id: exercicis[7].exercici_id, sets: 3, reps: '8/leg' },
    { rutina_id: rutina.rutina_id, day_name: 'Miércoles', exercici_id: exercicis[8].exercici_id, sets: 3, reps: '8-10' }
  ]);

  console.log(`✅ Rutina PPL Intermedia creada con ID ${rutina.rutina_id}`);
};