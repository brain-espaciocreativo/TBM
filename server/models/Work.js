const { DataTypes } = require('sequelize');

const Work = (conn) => conn.define('works', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    novedades: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false
});

module.exports = Work;
