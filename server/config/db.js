require("dotenv").config();
const { Sequelize } = require("sequelize");




const database = process.env.DB || 'TBM';
const username = process.env.USERDB || 'postgres';
const password = process.env.PASSDB || 'postgres';
const host = process.env.HOST || 'localhost';





const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres'
});

// const User = require('../models/User');
// const Work = require('../models/Work');
// const Categories = require('../models/Categories');



// const User = require('../models/User');
// const Work = require('../models/Work');
// const Categories = require('../models/Categories');


// User.belongsToMany(Work, { through: 'user_work' });
// Work.belongsToMany(User, { through: 'user_work' });
// Categories.belongsToMany(Work, { through: 'categories_work' });
// Work.belongsToMany(Categories, { through: 'categories_work' });








   module.exports = {
     conn: sequelize,
   };