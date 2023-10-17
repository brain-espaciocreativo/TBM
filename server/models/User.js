const { DataTypes } = require('sequelize');

const Users = (conn) => conn.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  surname:{
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});

module.exports = Users;