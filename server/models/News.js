const { DataTypes } = require('sequelize');

const News = (conn) => conn.define('news', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
