import { Sequelize } from 'sequelize';
import db from '../connection';
import { seedUsers } from './userSeeder';
import { seedExercicis } from './exerciciSeeder';
import { seedDietas } from './dietaSeeder';
import { seedAll } from './rutinaSeeder';

const seed = async () => {
  try {
    // Sincronizar modelos (crear tablas si no existen)
    console.log('📦 Sincronizando base de datos...');
    await db.sync({ force: true }); // ¡Cuidado! force: true borrará los datos existentes
    
    // Ejecutar seeders en orden adecuado
    console.log('📥 Ejecutando seeder de usuarios...');
    await seedUsers();
    console.log('📥 Ejecutando seeder de ejercicios...');
    await seedExercicis();
    console.log('📥 Ejecutando seeder de rutinas...');
    await seedAll();
    console.log('📥 Ejecutando seeder de dietas...');
    await seedDietas();

    console.log('✅ Seeders ejecutados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seeders:', error);
    process.exit(1);
  }
};

seed();