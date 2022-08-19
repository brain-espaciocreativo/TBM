const { DataTypes } = require('sequelize');

const News = (conn) => conn.define('news', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoriesId: {
    field: 'categories_id',
    type: DataTypes.INTEGER,
    allowNull: false
  },
  workId: {
    field: 'work_id',
    type: DataTypes.INTEGER,
    allowNull: false
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
