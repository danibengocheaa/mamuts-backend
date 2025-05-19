"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const rutines_1 = __importDefault(require("./rutines"));
const exercici_1 = __importDefault(require("./exercici"));
const RutinaDay = connection_1.default.define("RutinaDay", {
    rutina_day_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rutina_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Rutinas",
            key: "rutina_id",
        },
    },
    day_name: {
        type: sequelize_1.DataTypes.STRING(20), // Lunes, Martes, etc.
        allowNull: false,
    },
    exercici_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Exercicis",
            key: "exercici_id",
        },
    },
    sets: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 3,
    },
    reps: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: "10-12",
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    timestamps: false,
    tableName: "RutinaDays", // Make sure the table name is correct
});
// Establecer relación con Rutina
RutinaDay.belongsTo(rutines_1.default, { foreignKey: "rutina_id" });
// Establecer relación con Exercici
RutinaDay.belongsTo(exercici_1.default, { foreignKey: "exercici_id" });
exports.default = RutinaDay;
//# sourceMappingURL=rutinaDay.js.map