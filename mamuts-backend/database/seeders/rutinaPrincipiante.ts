import Exercici from "../../models/exercici";
import RutinaDay from "../../models/rutinaDay";
import Rutina from "../../models/rutines";
import { Model } from "sequelize";

export const seedRutinaPrincipiante = async () => {
  const rutina = await Rutina.create({
    nom: 'Rutina Fullbody Principiante',
    descripcio: 'Rutina completa para principiantes 3 días/semana',
    is_predefined: true,
    difficulty: 'Principiante',
    duration_weeks: 8,
    usuari_id: 1
  }) as Model & { rutina_id: number };

  // Buscar ejercicios existentes creados por exerciciSeeder.ts
  const exercicis = await Promise.all([
    Exercici.findOne({ where: { nom: 'Sentadillas Libres' } }),
    Exercici.findOne({ where: { nom: 'Press de Banca Plano' } }),
    Exercici.findOne({ where: { nom: 'Remo con Barra' } }),
    Exercici.findOne({ where: { nom: 'Peso Muerto Convencional' } }),
    Exercici.findOne({ where: { nom: 'Press Militar con Barra' } }),
    Exercici.findOne({ where: { nom: 'Dominadas Pronas' } }),
    Exercici.findOne({ where: { nom: 'Zancadas' } }),
    Exercici.findOne({ where: { nom: 'Fondos en Banco' } }),
    Exercici.findOne({ where: { nom: 'Curl de Bíceps con Barra' } })
  ]) as (Model & { exercici_id: number })[];

  // Verificar que todos los ejercicios existan
  if (exercicis.some(ex => !ex)) {
    throw new Error('Algunos ejercicios no se encontraron en la base de datos');
  }

  await RutinaDay.bulkCreate([
    // Día 1 (Lunes)
    { rutina_id: rutina.rutina_id, day_name: 'Lunes', exercici_id: exercicis[0].exercici_id, sets: 3, reps: '10-12' },
    { rutina_id: rutina.rutina_id, day_name: 'Lunes', exercici_id: exercicis[1].exercici_id, sets: 3, reps: '8-10' },
    { rutina_id: rutina.rutina_id, day_name: 'Lunes', exercici_id: exercicis[2].exercici_id, sets: 3, reps: '10' },
    
    // Día 2 (Miércoles)
    { rutina_id: rutina.rutina_id, day_name: 'Miércoles', exercici_id: exercicis[3].exercici_id, sets: 3, reps: '8' },
    { rutina_id: rutina.rutina_id, day_name: 'Miércoles', exercici_id: exercicis[4].exercici_id, sets: 3, reps: '8-10' },
    { rutina_id: rutina.rutina_id, day_name: 'Miércoles', exercici_id: exercicis[5].exercici_id, sets: 3, reps: 'MAX' },
    
    // Día 3 (Viernes)
    { rutina_id: rutina.rutina_id, day_name: 'Viernes', exercici_id: exercicis[6].exercici_id, sets: 3, reps: '10/leg' },
    { rutina_id: rutina.rutina_id, day_name: 'Viernes', exercici_id: exercicis[7].exercici_id, sets: 3, reps: '10-12' },
    { rutina_id: rutina.rutina_id, day_name: 'Viernes', exercici_id: exercicis[8].exercici_id, sets: 3, reps: '12' }
  ]);
};