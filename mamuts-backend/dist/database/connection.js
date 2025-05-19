"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//const db = new Sequelize("mamuts", "postgres", "mamuts",{
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
    console.log("DB_NAME", process.env.DB_NAME);
    throw new Error("Database environment variables are not properly set.");
}
const db = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    //host: 'localhost',process.env.DB_HOST
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map