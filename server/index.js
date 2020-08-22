const db = require("./config/db");
const app = require('./app');
const config = require('./config/config');
const associations = require('./models/associations');
const Task = require('./models/Task');
Task.create({ id: 1000 });

db.sync();
// db.sync({ force: true });
app.listen(config.port, () => console.log('server started on port ' + config.port));

// const resource=require("./models/Resource");

// resource.create({name: 'test3'}).then(() => {
//     resource.findAll({attributes: ['id'],raw:true}).then(result=>console.log(result));
// });
//resource.findAll().then(result=>console.log(result));






