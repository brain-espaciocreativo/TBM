const { DataTypes } = require('sequelize');

const {conn} = require('../config/db.js');

const Work = require('./Work.js');

 const User = conn.define('user', {
  id: {
    type:DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING
  },
  lastName:{
    type: DataTypes.STRING
  },
  password:{
    type: DataTypes.STRING
  },
  email:{
    type: DataTypes.STRING
  },
  phone:{
    type: DataTypes.STRING
  },
  role:{
    type: DataTypes.STRING
  }
}, {
  timestamps: false
})
User.belongsToMany(Work, { through: 'user_work' });
Work.belongsToMany(User, { through: 'user_work' });

module.exports = User;