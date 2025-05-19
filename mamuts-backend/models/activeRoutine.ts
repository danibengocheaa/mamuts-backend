import { DataTypes } from "sequelize"
import db from "../database/connection"
import Rutina from "./rutines"

const ActiveRoutine = db.define(
  "ActiveRoutine",
  {
    active_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuari_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "usuari_id",
      },
      unique: true, // Un usuario solo puede tener una rutina activa
    },
    rutina_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Rutinas",
        key: "rutina_id",
      },
    },
    start_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "ActiveRoutines", // Make sure the table name is correct
  },
)

// Establecer relación con Rutina
ActiveRoutine.belongsTo(Rutina, { foreignKey: "rutina_id" })

export default ActiveRoutine
