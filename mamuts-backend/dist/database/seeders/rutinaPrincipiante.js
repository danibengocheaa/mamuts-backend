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
exports.seedRutinaPrincipiante = void 0;
const exercici_1 = __importDefault(require("../../models/exercici"));
const rutinaDay_1 = __importDefault(require("../../models/rutinaDay"));
const rutines_1 = __importDefault(require("../../models/rutines"));
const seedRutinaPrincipiante = () => __awaiter(void 0, void 0, void 0, function* () {
    const rutina = yield rutines_1.default.create({
        nom: 'Rutina Fullbody Principiante',
        descripcio: 'Rutina completa para principiantes 3 días/semana',
        is_predefined: true,
        difficulty: 'Principiante',
        duration_weeks: 8,
        usuari_id: 1
    });
    // Buscar ejercicios existentes creados por exerciciSeeder.ts
    const exercicis = yield Promise.all([
        exercici_1.default.findOne({ where: { nom: 'Sentadillas Libres' } }),
        exercici_1.default.findOne({ where: { nom: 'Press de Banca Plano' } }),
        exercici_1.default.findOne({ where: { nom: 'Remo con Barra' } }),
        exercici_1.default.findOne({ where: { nom: 'Peso Muerto Convencional' } }),
        exercici_1.default.findOne({ where: { nom: 'Press Militar con Barra' } }),
        exercici_1.default.findOne({ where: { nom: 'Dominadas Pronas' } }),
        exercici_1.default.findOne({ where: { nom: 'Zancadas' } }),
        exercici_1.default.findOne({ where: { nom: 'Fondos en Banco' } }),
        exercici_1.default.findOne({ where: { nom: 'Curl de Bíceps con Barra' } })
    ]);
    // Verificar que todos los ejercicios existan
    if (exercicis.some(ex => !ex)) {
        throw new Error('Algunos ejercicios no se encontraron en la base de datos');
    }
    yield rutinaDay_1.default.bulkCreate([
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
});
exports.seedRutinaPrincipiante = seedRutinaPrincipiante;
//# sourceMappingURL=rutinaPrincipiante.js.map