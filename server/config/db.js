require("dotenv").config();
const { Sequelize } = require("sequelize");

const database = process.env.DB || 'tbm';
const username = process.env.USERDB || 'postgres';
const password = process.env.PASSDB || 'admin';
const host = process.env.HOST || 'localhost';

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  port: 5432 
});

module.exports = {
  conn: sequelize,
};