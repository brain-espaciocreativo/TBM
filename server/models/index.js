const { conn } = require('../config/db');
const Users = require('./User.js')(conn);
const Works = require('./Work.js')(conn);
const News = require('./News.js')(conn);
const Categories = require('./Categories')(conn);
const Progress = require('./Progress')(conn);

// Relacion usuarios con trabajos ( n a n)
Users.belongsToMany(Works, { through: "user_work" });
Works.belongsToMany(Users, { through: "user_work" });

// Relacion trabajo con novedades ( 1 a n)
Works.hasMany(News, { foreignKey: 'workId' });
News.belongsTo(Works, { foreignKey: 'workId' });

// Relacion trabajos con progreso (1 a n)
Works.hasMany(Progress, { foreignKey: 'workId' });
Progress.belongsTo(Works, { foreignKey: 'workId' });

// Relacion noticias a progreso ----> falta terminar (1 a 1)
News.hasMany(Progress, { foreignKey: 'newsId' });
Progress.belongsTo(News, { foreignKey: 'newsId' });

// Relacion progreso a categorias (1 a n)
Progress.belongsTo(Categories, { foreignKey: 'categoryId' });
Categories.hasMany(Progress, { foreignKey: 'categoryId' });

module.exports = {
    Users,
    Works,
    News,
    Categories,
    Progress,
    conn
};