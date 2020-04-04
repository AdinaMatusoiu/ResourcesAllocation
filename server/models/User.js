const Sequelize = require('sequelize');
const db=require('../config/db');

const User= db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:Sequelize.STRING,
    password_hash:Sequelize.STRING,
}, {
  timestamps:false,
});


// users: id, email, password, manager_id
// projects: id, name,
// resource_allocations: id, user_id, project_id, allocation_date
// 
module.exports=User;

// 

