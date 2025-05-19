"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const rutines_1 = __importDefault(require("./rutines"));
const ActiveRoutine = connection_1.default.define("ActiveRoutine", {
    active_id: {
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
        unique: true, // Un usuario solo puede tener una rutina activa
    },
    rutina_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Rutinas",
            key: "rutina_id",
        },
    },
    start_date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: "ActiveRoutines", // Make sure the table name is correct
});
// Establecer relación con Rutina
ActiveRoutine.belongsTo(rutines_1.default, { foreignKey: "rutina_id" });
exports.default = ActiveRoutine;
//# sourceMappingURL=activeRoutine.js.map