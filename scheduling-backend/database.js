/* database.js */


import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('schedulingDB', 'root', '122418Jackie', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
});

export default sequelize;

sequelize.authenticate()
  .then(() => {
      console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });
