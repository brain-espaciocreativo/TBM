const { DataTypes } = require('sequelize');

const {conn} = require('../config/db.js');
const Work = require('../models/Work')


 const Categories = conn.define('categories', {
  id: {
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})

Categories.belongsToMany(Work, { through: 'categories_work' });
Work.belongsToMany(Categories, { through: 'categories_work' });
module.exports = Categories;







