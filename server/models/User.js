const { Sequelize, DataTypes, Model } = require('sequelize');
const Obra = require('./Work');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}

User.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  password:{
    type: DataTypes.STRING
  },
  email:{
    type: DataTypes.STRING
  },
  phone:{
    type: DataTypes.NUMBER
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

User.belongsToMany(Obra, {through:'user_work'});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

module.exports = User;