"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.seedUsers = void 0;
// src/database/seeders/userSeeder.ts
const user_1 = __importDefault(require("../../models/user"));
const bcrypt = __importStar(require("bcrypt"));
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = [
        {
            nomUsuari: 'admin',
            password: yield bcrypt.hash('admin123', 10),
            email: 'admin@example.com',
            rol: 'Administrador',
            altura: 1.75,
            pes: 70.5,
            sexe: 'Masculino',
            dataNaix: new Date(1990, 0, 1)
        },
        {
            nomUsuari: 'usuari1',
            password: yield bcrypt.hash('password1', 10),
            email: 'user1@example.com',
            rol: 'usuari',
            altura: 1.65,
            pes: 60.0,
            sexe: 'Femenino',
            dataNaix: new Date(1995, 5, 15)
        },
        {
            nomUsuari: 'usuari2',
            password: yield bcrypt.hash('password2', 10),
            email: 'user2@example.com',
            rol: 'usuari',
            altura: 1.80,
            pes: 80.0,
            sexe: 'Masculino',
            dataNaix: new Date(1985, 10, 20)
        }
    ];
    yield user_1.default.bulkCreate(users);
    console.log('✅ Users seeded');
});
exports.seedUsers = seedUsers;
//# sourceMappingURL=userSeeder.js.map