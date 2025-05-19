import { DataTypes } from "sequelize";
import db from "../database/connection";

const User = db.define(
  "User",
  {
    usuari_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomUsuari: {
      type: DataTypes.STRING(50),
      unique: true, // NomUsuari serà únic, però no clau primària
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    altura: {
      type: DataTypes.DECIMAL(5, 2),
    },
    pes: {
      type: DataTypes.DECIMAL(5, 2),
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    telefon: {
      type: DataTypes.STRING(15),
    },
    sexe: {
      type: DataTypes.STRING(10),
    },
    dataNaix: {
      type: DataTypes.DATE,
    },
    rol: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['usuari', 'Administrador']],
      },
    },
    reset_token: {
      type: DataTypes.STRING(64),
    },
    reset_token_exp: {
      type: DataTypes.DATE,
    },
    image: {
      type: DataTypes.BLOB, // Utilitzem BLOB per a emmagatzemar les dades binàries
    },
    
  },
  {
    timestamps: false,
  }
);

export default User;
