const Sequelize = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const Comment = db.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    text: Sequelize.STRING,
    creation_date: Sequelize.DATE,
}, {
        timestamps: false,
    });


module.exports = Comment;