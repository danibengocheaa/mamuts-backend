import { DataTypes } from "sequelize"
import db from "../database/connection"

const Rutina = db.define(
  "Rutina",
  {
    rutina_id: {
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
    },
    nom: {
      type: DataTypes.STRING(50),
    },
    descripcio: {
      type: DataTypes.TEXT,
    },
    is_predefined: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
    difficulty: {
      type: DataTypes.STRING(20), // Principiante, Intermedio, Avanzado
      defaultValue: "Intermedio",
    },
    duration_weeks: {
      type: DataTypes.INTEGER,
      defaultValue: 4,
    },
  },
  {
    timestamps: false,
  },
)

export default Rutina
