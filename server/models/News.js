const { DataTypes } = require('sequelize');

const {conn} = require('../config/db.js');
const Work = require('../models/Work')



 const News = conn.define('news', {
  id: {
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE
  },
  description:{
    type: DataTypes.STRING
  },
  video:{
    type: DataTypes.STRING
  }
}, {
  timestamps: false
})

News.belongsToMany(Work, { through: 'news_work' });
Work.belongsToMany(News, { through: 'news_work' });

module.exports = News;