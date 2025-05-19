import { seedRutinaPrincipiante } from './rutinaPrincipiante';
import { seedRutinaIntermedia } from './rutinaIntermedia';
import { seedRutinaAvanzada } from './rutinaAvanzada';

export const seedAll = async () => {
  console.log('📥 Iniciando seeding de todas las rutinas...');
  
  await seedRutinaPrincipiante();
  console.log('📥 Finalizado seeding de rutina principiante.');
  
  await seedRutinaIntermedia();
  console.log('📥 Finalizado seeding de rutina intermedia.');
  
  await seedRutinaAvanzada();
  console.log('📥 Finalizado seeding de rutina avanzada.');
  
  console.log('✅ Todas las rutinas seeded correctamente');
};