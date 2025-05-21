import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

//const db = new Sequelize("mamuts", "postgres", "mamuts",{
// if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
//     console.log("DB_NAME", process.env.DB_NAME);

//     throw new Error("Database environment variables are not properly set.");
// }

if (!process.env.DB_URL) {
  console.log ("DB_URL", process.env.DB_URL);
    throw new Error("Database URL is not properly set.");
}

const db = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
});

// const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     //host: 'localhost',process.env.DB_HOST
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     logging: false 
// });

export default db;
