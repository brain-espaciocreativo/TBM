const { DataTypes } = require('sequelize');

const Progress = (conn) => conn.define('progress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    workId: {
        field: 'work_id',
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoriesId: {
        field: 'categories_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false
})

module.exports = Progress;
