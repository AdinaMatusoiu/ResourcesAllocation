const Sequelize = require('sequelize');
const db = require('../config/db');

const Calendar = db.define('calendar', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mydate: Sequelize.DATE
}, {
        timestamps: false,
    });

module.exports = Calendar;

