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
exports.seedRutinaIntermedia = void 0;
const exercici_1 = __importDefault(require("../../models/exercici"));
const rutinaDay_1 = __importDefault(require("../../models/rutinaDay"));
const rutines_1 = __importDefault(require("../../models/rutines"));
const seedRutinaIntermedia = () => __awaiter(void 0, void 0, void 0, function* () {
    // Check if routine already exists
    let rutina = yield rutines_1.default.findOne({ where: { nom: 'Rutina PPL Intermedia' } });
    if (!rutina) {
        console.log('📥 Creando Rutina PPL Intermedia...');
        rutina = (yield rutines_1.default.create({
            nom: 'Rutina PPL Intermedia',
            descripcio: 'Push/Pull/Legs 6 días/semana',
            is_predefined: true,
            difficulty: 'Intermedio',
            duration_weeks: 12,
            usuari_id: 1
        }));
    }
    else {
        console.log('ℹ️ Rutina PPL Intermedia ya existe, omitiendo creación.');
    }
    // Buscar ejercicios existentes creados por exerciciSeeder.ts
    const exercicis = yield Promise.all([
        exercici_1.default.findOne({ where: { nom: 'Press Inclinado con Mancuernas' } }),
        exercici_1.default.findOne({ where: { nom: 'Elevaciones Laterales' } }),
        exercici_1.default.findOne({ where: { nom: 'Fondos en Banco' } }),
        exercici_1.default.findOne({ where: { nom: 'Peso Muerto Convencional' } }),
        exercici_1.default.findOne({ where: { nom: 'Dominadas Pronas' } }),
        exercici_1.default.findOne({ where: { nom: 'Remo con Barra' } }),
        exercici_1.default.findOne({ where: { nom: 'Sentadilla Frontal' } }),
        exercici_1.default.findOne({ where: { nom: 'Bulgarian Split Squat' } }),
        exercici_1.default.findOne({ where: { nom: 'Peso Muerto Rumano' } })
    ]);
    // Verificar que todos los ejercicios existan
    if (exercicis.some(ex => !ex)) {
        throw new Error('Algunos ejercicios no se encontraron en la base de datos');
    }
    // Check if RutinaDay entries already exist for this rutina_id
    const existingDays = yield rutinaDay_1.default.count({ where: { rutina_id: rutina.rutina_id } });
    if (existingDays > 0) {
        console.log('ℹ️ RutinaDays para Rutina PPL Intermedia ya existen, omitiendo creación.');
        return;
    }
    yield rutinaDay_1.default.bulkCreate([
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
});
exports.seedRutinaIntermedia = seedRutinaIntermedia;
//# sourceMappingURL=rutinaIntermedia.js.map