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
exports.seedRutinaAvanzada = void 0;
const exercici_1 = __importDefault(require("../../models/exercici"));
const rutinaDay_1 = __importDefault(require("../../models/rutinaDay"));
const rutines_1 = __importDefault(require("../../models/rutines"));
const seedRutinaAvanzada = () => __awaiter(void 0, void 0, void 0, function* () {
    // Check if routine already exists
    let rutina = yield rutines_1.default.findOne({ where: { nom: 'Powerbuilding Avanzado' } });
    if (!rutina) {
        console.log('📥 Creando Powerbuilding Avanzado...');
        rutina = (yield rutines_1.default.create({
            nom: 'Powerbuilding Avanzado',
            descripcio: 'Combinación de fuerza e hipertrofia 5 días/semana',
            is_predefined: true,
            difficulty: 'Avanzado',
            duration_weeks: 16,
            usuari_id: 1
        }));
    }
    else {
        console.log('ℹ️ Powerbuilding Avanzado ya existe, omitiendo creación.');
    }
    // Buscar ejercicios existentes creados por exerciciSeeder.ts
    const exercicis = yield Promise.all([
        exercici_1.default.findOne({ where: { nom: 'Sentadilla Frontal' } }),
        exercici_1.default.findOne({ where: { nom: 'Prensa Inclinada 45°' } }),
        exercici_1.default.findOne({ where: { nom: 'Press Declinado con Barra' } }),
        exercici_1.default.findOne({ where: { nom: 'Arnold Press' } }),
        exercici_1.default.findOne({ where: { nom: 'Peso Muerto Convencional' } }),
        exercici_1.default.findOne({ where: { nom: 'Dominadas Pronas' } }),
        exercici_1.default.findOne({ where: { nom: 'Press Inclinado con Mancuernas' } }),
        exercici_1.default.findOne({ where: { nom: 'Fondos en Paralelas con Peso' } }),
        exercici_1.default.findOne({ where: { nom: 'Bulgarian Split Squat' } }),
        exercici_1.default.findOne({ where: { nom: 'Face Pulls' } })
    ]);
    // Verificar que todos los ejercicios existan
    if (exercicis.some(ex => !ex)) {
        throw new Error('Algunos ejercicios no se encontraron en la base de datos');
    }
    // Check if RutinaDay entries already exist for this rutina_id
    const existingDays = yield rutinaDay_1.default.count({ where: { rutina_id: rutina.rutina_id } });
    if (existingDays > 0) {
        console.log('ℹ️ RutinaDays para Powerbuilding Avanzado ya existen, omitiendo creación.');
        return;
    }
    yield rutinaDay_1.default.bulkCreate([
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
});
exports.seedRutinaAvanzada = seedRutinaAvanzada;
//# sourceMappingURL=rutinaAvanzada.js.map