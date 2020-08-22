const Sequelize = require('sequelize');
const Task = require('./Task');
const db = require('../config/db');

const WorkLog = db.define('worklog', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: Sequelize.STRING,
    date: Sequelize.DATE,
    from: Sequelize.STRING,
    to: Sequelize.STRING,
    task_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Task,
            key: "id"
        }
    }
}, {
    timestamps: false,
});



module.exports = WorkLog;



