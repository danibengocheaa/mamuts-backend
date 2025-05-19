"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRutinaDays = void 0;
// src/database/seeders/rutinaDaySeeder.ts
const rutinaDay_1 = __importDefault(require("../../models/rutinaDay"));
const seedRutinaDays = () => __awaiter(void 0, void 0, void 0, function* () {
    const rutinaDays = [
        {
            rutina_id: 1,
            day_name: 'Lunes',
            exercici_id: 1, // Press de banca
            sets: 4,
            reps: '8-10',
            notes: 'Calentar bien antes'
        },
        {
            rutina_id: 1,
            day_name: 'Lunes',
            exercici_id: 2, // Sentadillas
            sets: 3,
            reps: '10-12',
            notes: 'Mantener la espalda recta'
        },
        {
            rutina_id: 1,
            day_name: 'Miércoles',
            exercici_id: 3, // Dominadas
            sets: 3,
            reps: '6-8',
            notes: 'Usar asistencia si es necesario'
        },
        {
            rutina_id: 2,
            day_name: 'Martes',
            exercici_id: 4, // Peso muerto
            sets: 5,
            reps: '5-5-5-5-5',
            notes: 'Técnica perfecta'
        },
        {
            rutina_id: 3,
            day_name: 'Viernes',
            exercici_id: 5, // Curl de bíceps
            sets: 3,
            reps: '12-15',
            notes: 'Controlar el movimiento'
        }
    ];
    yield rutinaDay_1.default.bulkCreate(rutinaDays);
    console.log('✅ RutinaDays seeded');
});
exports.seedRutinaDays = seedRutinaDays;
//# sourceMappingURL=rutinaDaySeeder.js.map