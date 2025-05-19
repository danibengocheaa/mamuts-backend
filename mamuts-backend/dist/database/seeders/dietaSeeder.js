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
exports.seedDietas = void 0;
// src/database/seeders/dietaSeeder.ts
const dieta_1 = __importDefault(require("../../models/dieta"));
const seedDietas = () => __awaiter(void 0, void 0, void 0, function* () {
    const dietas = [
        {
            usuari_id: 1,
            nom: 'Dieta de volumen',
            descripcio: 'Dieta alta en calorías para ganar masa muscular',
            calories: 3000,
            image: null
        },
        {
            usuari_id: 1,
            nom: 'Dieta de definición',
            descripcio: 'Dieta para perder grasa manteniendo músculo',
            calories: 2200,
            image: null
        },
        {
            usuari_id: 2,
            nom: 'Dieta equilibrada',
            descripcio: 'Dieta para mantenimiento',
            calories: 2500,
            image: null
        }
    ];
    yield dieta_1.default.bulkCreate(dietas);
    console.log('✅ Dietas seeded');
});
exports.seedDietas = seedDietas;
//# sourceMappingURL=dietaSeeder.js.map