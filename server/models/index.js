import Sequelize from 'sequelize';
import patient from './patient.js';
import storyForm from './storyForm.js';
import doctor from './doctor.js';
import message from './message.js';

const sequelize = new Sequelize({
  database: 'onlineNorolojiDestek',
  username: 'postgres',
  password: 'bedir123456',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});

patient(sequelize, Sequelize);
storyForm(sequelize, Sequelize);
doctor(sequelize, Sequelize);
message(sequelize, Sequelize);
const models = sequelize.models;

export { sequelize };

export default models;