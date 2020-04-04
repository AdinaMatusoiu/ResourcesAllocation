const User = require('./User');
const Project = require('./Project');
const ResourceAllocation = require('./ResourceAllocation');

// .create({}), .findAll({attributes: ['id'], where: { name: 'axinte'}})/.findOne, .destroy, .update
//  insert          select          delete      update

// Project.create({name:'omi',})

// for(let i=0;i<10;i++){
//     Project.create({
//         name:'omi'+i
//     })
// }




User.belongsToMany(Project, {through: ResourceAllocation});
Project.belongsToMany(User, {through: ResourceAllocation});