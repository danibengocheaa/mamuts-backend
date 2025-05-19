"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const sequelize_1 = require("sequelize");
const Dieta = connection_1.default.define('Dieta', {
    dieta_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuari_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nom: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    descripcio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    calories: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: true,
    },
}, {
    tableName: 'Dieta',
    timestamps: false,
});
exports.default = Dieta;
//# sourceMappingURL=dieta.js.map