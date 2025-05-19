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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAll = void 0;
const rutinaPrincipiante_1 = require("./rutinaPrincipiante");
const rutinaIntermedia_1 = require("./rutinaIntermedia");
const rutinaAvanzada_1 = require("./rutinaAvanzada");
const seedAll = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('📥 Iniciando seeding de todas las rutinas...');
    yield (0, rutinaPrincipiante_1.seedRutinaPrincipiante)();
    console.log('📥 Finalizado seeding de rutina principiante.');
    yield (0, rutinaIntermedia_1.seedRutinaIntermedia)();
    console.log('📥 Finalizado seeding de rutina intermedia.');
    yield (0, rutinaAvanzada_1.seedRutinaAvanzada)();
    console.log('📥 Finalizado seeding de rutina avanzada.');
    console.log('✅ Todas las rutinas seeded correctamente');
});
exports.seedAll = seedAll;
//# sourceMappingURL=rutinaSeeder.js.map