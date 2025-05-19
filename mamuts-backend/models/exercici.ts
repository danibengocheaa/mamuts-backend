import { DataTypes } from "sequelize";
import db from "../database/connection";

const Exercici = db.define(
  "Exercici",
  {
    exercici_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rutina_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Rutinas', // Nombre de la tabla referenciada
        key: 'rutina_id',
      },
    },
    nom: {
      type: DataTypes.STRING(50),
    },
    descripcio: {
      type: DataTypes.TEXT, // Sequelize usa TEXT en lugar de CLOB
    },
    grupMuscular: {
      type: DataTypes.STRING(50),
    },
    dificultat: {
      type: DataTypes.STRING(20),
    },
  image: {
    type: DataTypes.BLOB,
  },
  },
  {
    timestamps: false,
  }
);

export default Exercici;