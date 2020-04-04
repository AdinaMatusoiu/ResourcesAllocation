const Sequelize = require('sequelize');
const db=require('../config/db');
const User = require('./User');
const Project = require('./Project');

const ResourceAllocation= db.define('resource_allocation', {
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
    project_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Project,
        key: 'id'
      }
    },
    name:Sequelize.STRING,
    allocation_date:Sequelize.DATE,

 
}, {

  timestamps:false,
});


module.exports=ResourceAllocation;