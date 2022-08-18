const { DataTypes } = require('sequelize');

const {conn} = require('../config/db.js');



 const Work = conn.define('work', {
  id: {
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  progress: {
    type: DataTypes.STRING
  },
  novedades:{
    type: DataTypes.STRING
  }
}, {
  timestamps: false
})


module.exports = Work;


