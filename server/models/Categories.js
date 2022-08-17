const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Categories extends Model {}

Categories.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Categories' // We need to choose the model name
});
Categorias.belongsToMany(Obras, {through:'categories_works'});


// the defined model is the class itself
console.log(User === sequelize.models.User); // true


module.exports = Categories;