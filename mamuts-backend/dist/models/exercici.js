"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Exercici = connection_1.default.define("Exercici", {
    exercici_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rutina_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Rutinas', // Nombre de la tabla referenciada
            key: 'rutina_id',
        },
    },
    nom: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    descripcio: {
        type: sequelize_1.DataTypes.TEXT, // Sequelize usa TEXT en lugar de CLOB
    },
    grupMuscular: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    dificultat: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    image: {
        type: sequelize_1.DataTypes.BLOB,
    },
}, {
    timestamps: false,
});
exports.default = Exercici;
//# sourceMappingURL=exercici.js.map