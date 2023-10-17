const { DataTypes } = require('sequelize');

const Progress = (conn) => conn.define('progress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false
})

module.exports = Progress;
