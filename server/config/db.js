require("dotenv").config();
const { Sequelize } = require("sequelize");

const database = process.env.DB 
const username = process.env.USERDB
const password = process.env.PASSDB
const host = process.env.HOSTDB


const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres'
});

   module.exports = {
     conn: sequelize,
   };