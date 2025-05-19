"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Rutina = connection_1.default.define("Rutina", {
    rutina_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuari_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "usuari_id",
        },
    },
    nom: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    descripcio: {
        type: sequelize_1.DataTypes.TEXT,
    },
    is_predefined: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    image_url: {
        type: sequelize_1.DataTypes.STRING(255),
        defaultValue: null,
    },
    difficulty: {
        type: sequelize_1.DataTypes.STRING(20), // Principiante, Intermedio, Avanzado
        defaultValue: "Intermedio",
    },
    duration_weeks: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 4,
    },
}, {
    timestamps: false,
});
exports.default = Rutina;
//# sourceMappingURL=rutines.js.map