import { DataTypes } from "sequelize"
import db from "../database/connection"
import Rutina from "./rutines"
import Exercici from "./exercici"

const RutinaDay = db.define(
  "RutinaDay",
  {
    rutina_day_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rutina_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Rutinas",
        key: "rutina_id",
      },
    },
    day_name: {
      type: DataTypes.STRING(20), // Lunes, Martes, etc.
      allowNull: false,
    },
    exercici_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Exercicis",
        key: "exercici_id",
      },
    },
    sets: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },
    reps: {
      type: DataTypes.STRING(20),
      defaultValue: "10-12",
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    tableName: "RutinaDays", // Make sure the table name is correct
  },
)

// Establecer relación con Rutina
RutinaDay.belongsTo(Rutina, { foreignKey: "rutina_id" })
// Establecer relación con Exercici
RutinaDay.belongsTo(Exercici, { foreignKey: "exercici_id" })

export default RutinaDay
