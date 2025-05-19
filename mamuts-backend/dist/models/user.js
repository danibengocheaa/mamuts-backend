"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const User = connection_1.default.define("User", {
    usuari_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nomUsuari: {
        type: sequelize_1.DataTypes.STRING(50),
        unique: true, // NomUsuari serà únic, però no clau primària
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    altura: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
    },
    pes: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
    },
    telefon: {
        type: sequelize_1.DataTypes.STRING(15),
    },
    sexe: {
        type: sequelize_1.DataTypes.STRING(10),
    },
    dataNaix: {
        type: sequelize_1.DataTypes.DATE,
    },
    rol: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: [['usuari', 'Administrador']],
        },
    },
    reset_token: {
        type: sequelize_1.DataTypes.STRING(64),
    },
    reset_token_exp: {
        type: sequelize_1.DataTypes.DATE,
    },
    image: {
        type: sequelize_1.DataTypes.BLOB, // Utilitzem BLOB per a emmagatzemar les dades binàries
    },
}, {
    timestamps: false,
});
exports.default = User;
//# sourceMappingURL=user.js.map