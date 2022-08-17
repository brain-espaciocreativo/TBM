require("dotenv").config();
const { Sequelize } = require("sequelize");

// console.log(process.env)

const database = 'pokemon'
const username = 'postgres'
const password = 'Yoel1234'

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = {
    conn: sequelize,
};