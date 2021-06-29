import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  database: 'onlineNorolojiDestek',
  username: 'postgres',
  password: 'bedir123456',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});

export default sequelize;