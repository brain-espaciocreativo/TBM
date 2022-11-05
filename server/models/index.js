const { conn } = require('../config/db');
const Users = require('./User.js')(conn);
const Works = require('./Work.js')(conn);
const News = require('./News.js')(conn);
const Categories = require('./Categories')(conn);
const Progress = require('./Progress')(conn);

// TODO: Crear relaciones

// Relacion usuarios con trabajos ( n a n)
Users.belongsToMany( Works, { through: "user_work"});
Works.belongsToMany(Users, { through:"user_work" });



// Relacion trabajo con novedades ( 1 a n)
Works.hasMany(News, { foreignKey: 'workId', sourceKey: 'id' });
News.belongsTo(Works, { foreignKey: 'workId', targetId: 'id' });

// Relacion trabajos con progreso (1 a n)
Works.hasMany(Progress, { foreignKey: 'work_progress', sourceKey: 'id' });
Progress.belongsTo(Works, { foreignKey: 'work_progress', targetId: 'id' });

// Relacion noticias a progreso ----> falta terminar (1 a 1)
News.hasOne(Progress, { foreignKey: 'newsId', sourceKey: 'id' });
Progress.belongsTo(News, {foreignKey: 'newsId', targetId: 'id'});

// Relacion progreso a categorias (1 a 1)
Categories.hasOne(Progress, { foreignKey: 'categoryId', sourceKey: 'id' });
Progress.belongsTo(Categories, { foreignKey: 'categoryId', sourceKey: 'id' })

module.exports = {
    Users,
    Works,
    News,
    Categories,
    Progress,
    conn
};