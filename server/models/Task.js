const Sequelize = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const Task = db.define('task', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    resource_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    creator_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    status: Sequelize.STRING,
    description: Sequelize.STRING,
    priority: Sequelize.STRING,
    deadline: Sequelize.DATE,
});


module.exports = Task;