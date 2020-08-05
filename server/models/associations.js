const User = require('./User');
const Task = require('./Task');
const Comment = require('./Comment');
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

User.hasMany(Task, { as: 'assignedTasks', foreignKey: 'resource_id' });
Task.belongsTo(User, { as: 'resource', foreignKey: 'resource_id' });
User.hasMany(Task, { as: 'createdTasks', foreignKey: 'creator_id' });
Task.belongsTo(User, { as: 'manager', foreignKey: 'creator_id' });

User.hasMany(Comment, { as: 'comments', foreignKey: 'user_id' });
Comment.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
