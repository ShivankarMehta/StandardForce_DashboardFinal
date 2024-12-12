import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('tomsms_db', 'root', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});
console.log(process.env.DB_PASSWORD)
export default sequelize;
