const { DataTypes } = require('sequelize');

const Progress = (conn) => conn.define('progress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = Progress;
