// src/database/seeders/userSeeder.ts
import User from '../../models/user';
import * as bcrypt from 'bcrypt';

export const seedUsers = async () => {
  const users = [
    {
      nomUsuari: 'admin',
      password: await bcrypt.hash('admin123', 10),
      email: 'admin@example.com',
      rol: 'Administrador',
      altura: 1.75,
      pes: 70.5,
      sexe: 'Masculino',
      dataNaix: new Date(1990, 0, 1)
    },
    {
      nomUsuari: 'usuari1',
      password: await bcrypt.hash('password1', 10),
      email: 'user1@example.com',
      rol: 'usuari',
      altura: 1.65,
      pes: 60.0,
      sexe: 'Femenino',
      dataNaix: new Date(1995, 5, 15)
    },
    {
      nomUsuari: 'usuari2',
      password: await bcrypt.hash('password2', 10),
      email: 'user2@example.com',
      rol: 'usuari',
      altura: 1.80,
      pes: 80.0,
      sexe: 'Masculino',
      dataNaix: new Date(1985, 10, 20)
    }
  ];

  await User.bulkCreate(users);
  console.log('✅ Users seeded');
};