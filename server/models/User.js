const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password_hash: Sequelize.STRING,
  user_role: Sequelize.STRING,
  manager_id: Sequelize.INTEGER,
}, {
    timestamps: false,
  });


// users: id, email, password, manager_id
// projects: id, name,
// resource_allocations: id, user_id, project_id, allocation_date
// 
module.exports = User;

// 

