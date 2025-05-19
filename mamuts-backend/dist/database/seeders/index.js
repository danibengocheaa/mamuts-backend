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
const connection_1 = __importDefault(require("../connection"));
const userSeeder_1 = require("./userSeeder");
const exerciciSeeder_1 = require("./exerciciSeeder");
const dietaSeeder_1 = require("./dietaSeeder");
const rutinaSeeder_1 = require("./rutinaSeeder");
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Sincronizar modelos (crear tablas si no existen)
        console.log('📦 Sincronizando base de datos...');
        yield connection_1.default.sync({ force: true }); // ¡Cuidado! force: true borrará los datos existentes
        // Ejecutar seeders en orden adecuado
        console.log('📥 Ejecutando seeder de usuarios...');
        yield (0, userSeeder_1.seedUsers)();
        console.log('📥 Ejecutando seeder de ejercicios...');
        yield (0, exerciciSeeder_1.seedExercicis)();
        console.log('📥 Ejecutando seeder de rutinas...');
        yield (0, rutinaSeeder_1.seedAll)();
        console.log('📥 Ejecutando seeder de dietas...');
        yield (0, dietaSeeder_1.seedDietas)();
        console.log('✅ Seeders ejecutados correctamente');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error en seeders:', error);
        process.exit(1);
    }
});
seed();
//# sourceMappingURL=index.js.map