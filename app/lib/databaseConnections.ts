// pages/api/_lib/database.ts
import sequelize from '../dbConfig/dbConfig';
import User from '../models/userModel';

// Sync the models with the database
async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync the models with the database (create tables if they don't exist)
    await sequelize.sync();
    console.log('Models synchronized with the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { connectDatabase, User };
