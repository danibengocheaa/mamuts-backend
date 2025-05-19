import db from "../database/connection";
import { Model, DataTypes } from 'sequelize';

// Interfaz para las propiedades de una Dieta
interface DietaAttributes {
  dieta_id?: number;
  usuari_id: number;
  nom: string;
  descripcio: string;
  calories: number;
  image: string | null;
}

// Interfaz para el modelo Dieta que extiende Model
interface DietaInstance extends Model<DietaAttributes>, DietaAttributes {}
const Dieta = db.define<DietaInstance>('Dieta', {
  dieta_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuari_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calories: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  
}, {
  tableName: 'Dieta',
  timestamps: false,
});

export default Dieta;