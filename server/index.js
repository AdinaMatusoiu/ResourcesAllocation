const db = require("./config/db");
const app = require('./app');
const config = require('./config/config');
const associations = require('./models/associations');
const Task = require('./models/Task');
const User = require('./models/User');
const { randomIntFromInterval, getDate } = require('./utils');




db.sync()
// .then(() => {
//     const enums = {
//         type: ['bugfix', 'issue', 'feature'],
//         status: ['open', 'closed'],
//         priority: ['low', 'medium', 'high_on_mushrooms'],
//     }

//     User.findAll({ where: { user_role: 'resource' }, raw: true })
//         .then(resources => {
//             resources.forEach(resource => {
//                 [0, 1, 2, 3, 4, 5, 6, 7].forEach(monthIndex => {
//                     for (let i = 1; i <= 29; i++) {
//                         const noTasksCurrentDay = randomIntFromInterval(4, 7);
//                         for (let j = 0; j < noTasksCurrentDay; j++) {
//                             let creation_date = new Date(2020, monthIndex, i);
//                             creation_date = getDate(new Date(creation_date).toLocaleDateString('en-US'));
//                             let closed_date = new Date(2020, monthIndex, i + randomIntFromInterval(1, 3));
//                             closed_date = getDate(new Date(closed_date).toLocaleDateString('en-US'));
//                             let deadline = new Date(2020, monthIndex, i + randomIntFromInterval(1, 2));
//                             deadline = getDate(new Date(deadline).toLocaleDateString('en-US'));
//                             Task.create({
//                                 resource_id: resource.id,
//                                 creator_id: 1,
//                                 name: `${resource.name}_${monthIndex}_${i}_${j}`,
//                                 description: `description_${resource.name}_${monthIndex}_${i}_${j}`,
//                                 status: 'closed',
//                                 type: enums.type[randomIntFromInterval(0, 2)],
//                                 priority: enums.priority[randomIntFromInterval(0, 2)],
//                                 creation_date,
//                                 closed_date,
//                                 deadline
//                             })
//                         }
//                     }
//                 })
//             })
//         })
// })
// db.sync({ force: true });
app.listen(config.port, () => console.log('server started on port ' + config.port));

// const resource=require("./models/Resource");

// resource.create({name: 'test3'}).then(() => {
//     resource.findAll({attributes: ['id'],raw:true}).then(result=>console.log(result));
// });
//resource.findAll().then(result=>console.log(result));






