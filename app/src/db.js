require("dotenv").config();
const { Sequelize } = require("sequelize");

// console.log(process.env)

const database = ''
const username = ''
const password = ''

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = {
    conn: sequelize,
};