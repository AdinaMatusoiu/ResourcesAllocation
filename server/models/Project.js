const Sequelize = require('sequelize');
const db=require('../config/db');

const Project= db.define('project', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:Sequelize.STRING,

 
}, {

  timestamps:false,
});


module.exports=Project;