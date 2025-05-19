import { DataTypes } from 'sequelize';
import db from "../database/connection";

const ProgressPhoto = db.define('ProgressPhoto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING(7), // Formato 'YYYY-MM'
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'progress_photos',
  timestamps: false, // Si no usas updatedAt
});

export default ProgressPhoto;