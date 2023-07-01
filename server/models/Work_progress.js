const { DataTypes } = require('sequelize');

const WorkProgress = (conn) => conn.define('work_progress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    work_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    new_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = WorkProgress;
