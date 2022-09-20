const { DataTypes } = require('sequelize');

const News = (conn) => conn.define('news', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATE
  },
  description: {
    type: DataTypes.STRING
  },
  video: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});

module.exports = News;
