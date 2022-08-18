require("dotenv").config();
const { Sequelize } = require("sequelize");
// const User = require('../models/User');
// const Work = require('../models/Work');



const database = process.env.DB || 'TBM';
const username = process.env.USERDB || 'postgres';
const password = process.env.PASSDB || 'postgres';
const host = process.env.HOST || 'localhost';

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres'
});
// User.belongsToMany(Work, { through: 'user_work' });
// Work.belongsToMany(User, { through: 'user_work' });
module.exports = {
  conn: sequelize,

};