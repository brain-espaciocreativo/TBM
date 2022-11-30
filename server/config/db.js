require("dotenv").config();
const { Sequelize } = require("sequelize");

const database = process.env.DB || 'tbm';
const username = process.env.USERDB || 'postgres';
const password = process.env.PASSDB || 'postgres';
const host = process.env.HOST || 'localhost';

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres'
});

module.exports = {
  conn: sequelize,
};