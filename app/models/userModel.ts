// models/User.js
import { Model, DataTypes } from 'sequelize';
import sequelize from '../dbConfig/dbConfig';

interface UserAttributes {
  username: string;
  userId: string;
  password: string;
  // Add other fields if necessary
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}


const User = sequelize.define<UserInstance>('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
