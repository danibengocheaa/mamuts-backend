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
exports.seedExercicis = void 0;
const exercici_1 = __importDefault(require("../../models/exercici"));
const seedExercicis = () => __awaiter(void 0, void 0, void 0, function* () {
    const exercicis = [
        // ---- PECTORALES ----
        {
            nom: 'Press de Banca Plano',
            descripcio: 'Ejercicio básico para pectorales con barra',
            grupMuscular: 'Pectoral',
            dificultat: 'Principiante',
            image: 'https://images.unsplash.com/photo-1581009146145-b5ef3b783e0e'
        },
        {
            nom: 'Press Inclinado con Mancuernas',
            descripcio: 'Variación para pectoral superior',
            grupMuscular: 'Pectoral',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1597452485669-2c7b77e0bdfd'
        },
        {
            nom: 'Press Declinado con Barra',
            descripcio: 'Enfocado en pectoral inferior',
            grupMuscular: 'Pectoral',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c'
        },
        {
            nom: 'Aperturas en Polea Cruzada',
            descripcio: 'Ejercicio de aislamiento para pectorales',
            grupMuscular: 'Pectoral',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd'
        },
        {
            nom: 'Fondos en Paralelas con Peso',
            descripcio: 'Ejercicio compuesto avanzado',
            grupMuscular: 'Pectoral, Tríceps',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1530822847156-5df3f539f13c'
        },
        // ---- ESPALDA ----
        {
            nom: 'Remo con Barra',
            descripcio: 'Ejercicio fundamental para espalda',
            grupMuscular: 'Espalda',
            dificultat: 'Principiante',
            image: 'https://images.unsplash.com/photo-1581129762299-76240e3eb07f'
        },
        {
            nom: 'Dominadas Pronas',
            descripcio: 'Ejercicio con peso corporal para dorsales',
            grupMuscular: 'Espalda',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438'
        },
        {
            nom: 'Peso Muerto Convencional',
            descripcio: 'Ejercicio rey para espalda y cadena posterior',
            grupMuscular: 'Espalda, Piernas',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1605296866985-34b17489d6d2'
        },
        {
            nom: 'Pullover en Polea',
            descripcio: 'Aislamiento para dorsales',
            grupMuscular: 'Espalda',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1594882645126-140b6c9f0f0b'
        },
        {
            nom: 'Remo T-Bar',
            descripcio: 'Variación avanzada para espalda media',
            grupMuscular: 'Espalda',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
        },
        // ---- PIERNAS ----
        {
            nom: 'Sentadillas Libres',
            descripcio: 'Ejercicio fundamental para piernas',
            grupMuscular: 'Piernas',
            dificultat: 'Principiante',
            image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1'
        },
        {
            nom: 'Prensa Inclinada 45°',
            descripcio: 'Ejercicio con máquina para cuádriceps',
            grupMuscular: 'Piernas',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720f446'
        },
        {
            nom: 'Sentadilla Frontal',
            descripcio: 'Variación avanzada con énfasis en cuádriceps',
            grupMuscular: 'Piernas',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77'
        },
        {
            nom: 'Peso Muerto Rumano',
            descripcio: 'Ejercicio para isquiosurales',
            grupMuscular: 'Piernas',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c'
        },
        {
            nom: 'Bulgarian Split Squat',
            descripcio: 'Ejercicio unilateral avanzado',
            grupMuscular: 'Piernas',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e'
        },
        {
            nom: 'Zancadas',
            descripcio: 'Ejercicio unilateral para piernas y glúteos',
            grupMuscular: 'Piernas',
            dificultat: 'Principiante',
            image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438'
        },
        // ---- HOMBROS ----
        {
            nom: 'Press Militar con Barra',
            descripcio: 'Ejercicio básico para hombros',
            grupMuscular: 'Hombros',
            dificultat: 'Principiante',
            image: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c'
        },
        {
            nom: 'Elevaciones Laterales',
            descripcio: 'Aislamiento para deltoides laterales',
            grupMuscular: 'Hombros',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1594882645126-140b6c9f0f0b'
        },
        {
            nom: 'Arnold Press',
            descripcio: 'Variación avanzada de press militar',
            grupMuscular: 'Hombros',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd'
        },
        {
            nom: 'Face Pulls',
            descripcio: 'Ejercicio para deltoides posteriores',
            grupMuscular: 'Hombros',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1571019614242-c5f6d2b1a1b9'
        },
        {
            nom: 'Push Press',
            descripcio: 'Ejercicio explosivo para hombros',
            grupMuscular: 'Hombros',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1605296866985-34b17489d6d2'
        },
        // ---- BRAZOS ----
        {
            nom: 'Curl de Bíceps con Barra',
            descripcio: 'Ejercicio básico para bíceps',
            grupMuscular: 'Brazos',
            dificultat: 'Principiante',
            image: 'https://images.unsplash.com/photo-1581009146145-b5ef3b783e0e'
        },
        {
            nom: 'Fondos en Banco',
            descripcio: 'Ejercicio para tríceps con peso corporal',
            grupMuscular: 'Brazos',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438'
        },
        {
            nom: 'Curl Martillo',
            descripcio: 'Variación para braquial y antebrazos',
            grupMuscular: 'Brazos',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1597452485669-2c7b77e0bdfd'
        },
        {
            nom: 'Extensión de Tríceps en Polea',
            descripcio: 'Aislamiento para tríceps',
            grupMuscular: 'Brazos',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1530822847156-5df3f539f13c'
        },
        {
            nom: 'Curl en Banco Scott',
            descripcio: 'Aislamiento avanzado para bíceps',
            grupMuscular: 'Brazos',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
        },
        // ---- ABDOMINALES/CORE ----
        {
            nom: 'Plancha Abdominal',
            descripcio: 'Ejercicio isométrico para core',
            grupMuscular: 'Core',
            dificultat: 'Principiante',
            image: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a'
        },
        {
            nom: 'Russian Twists',
            descripcio: 'Rotaciones para oblicuos',
            grupMuscular: 'Core',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e'
        },
        {
            nom: 'Dragon Flags',
            descripcio: 'Ejercicio avanzado para abdominales',
            grupMuscular: 'Core',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720f446'
        },
        {
            nom: 'Hanging Leg Raises',
            descripcio: 'Elevaciones de piernas colgado',
            grupMuscular: 'Core',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77'
        },
        {
            nom: 'Ab Wheel Rollout',
            descripcio: 'Ejercicio avanzado con rueda abdominal',
            grupMuscular: 'Core',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c'
        },
        // ---- EJERCICIOS FUNCIONALES ----
        {
            nom: 'Burpees',
            descripcio: 'Ejercicio completo de cuerpo entero',
            grupMuscular: 'Fullbody',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1'
        },
        {
            nom: 'Muscle Ups',
            descripcio: 'Ejercicio avanzado en barras',
            grupMuscular: 'Fullbody',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1581129762299-76240e3eb07f'
        },
        {
            nom: 'Kettlebell Swings',
            descripcio: 'Ejercicio explosivo para cadena posterior',
            grupMuscular: 'Piernas, Espalda',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1605296866985-34b17489d6d2'
        },
        {
            nom: 'Clean and Jerk',
            descripcio: 'Movimiento olímpico completo',
            grupMuscular: 'Fullbody',
            dificultat: 'Avanzado',
            image: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c'
        },
        {
            nom: 'Battle Ropes',
            descripcio: 'Ejercicio cardiovascular y de fuerza',
            grupMuscular: 'Fullbody',
            dificultat: 'Intermedio',
            image: 'https://images.unsplash.com/photo-1594882645126-140b6c9f0f0b'
        }
    ];
    yield exercici_1.default.bulkCreate(exercicis);
    console.log(`✅ Se han creado ${exercicis.length} ejercicios`);
});
exports.seedExercicis = seedExercicis;
//# sourceMappingURL=exerciciSeeder.js.map