const { conn } = require('../config/db');
const Users = require('./User.js')(conn);
const Works = require('./Work.js')(conn);
const News = require('./News.js')(conn);
const Categories = require('./Categories')(conn);
const Progress = require('./Progress')(conn);

// TODO: Crear relaciones

module.exports = {
    Users,
    Works,
    News,
    Categories,
    Progress,
    conn
};