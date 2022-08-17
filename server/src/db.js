require("dotenv").config();
const { Sequelize } = require("sequelize");

// console.log(process.env)

const database = 'j'
const username = 'j'
const password = 'j'

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = {
    conn: sequelize,
};
