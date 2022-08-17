const { Sequelize, DataTypes, Model } = require('sequelize');
const Categorias = require('./Categories');
const User = require('./User');
const sequelize = new Sequelize('sqlite::memory:');

class Work extends Model {}

Work.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  progress: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  novedades:{
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Work' // We need to choose the model name
});

Work.belongsToMany(Categorias, {through:'work_category'});
Work.belongsToMany(User, {through:'work_user'});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true


module.exports = Work;