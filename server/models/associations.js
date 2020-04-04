const User = require('./User');
const Project = require('./Project');
const ResourceAllocation = require('./ResourceAllocation');

// .create({}), .findAll({attributes: ['id'], where: { name: 'axinte'}})/.findOne, .destroy, .update
//  insert          select          delete      update

// Project.create({ name: 'omi', })

// for (let i = 0; i < 10; i++) {
//     Project.create({
//         name: 'omi' + i
//     })
// }
// select * from users where email = req.body.email;
// daca selectul asta intoarce ceva, emailul nu e unic.
// daca intoarce null/undefined, emailul este unic (adica nu mai exista).



User.belongsToMany(Project, { through: ResourceAllocation });
Project.belongsToMany(User, { through: ResourceAllocation });