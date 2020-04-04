const db=require("./config/db");
const app=require('./app');
const config=require('./config/config');
const associations = require('./models/associations');

db.sync();
// db.sync({force: true});
app.listen(config.port);




// const resource=require("./models/Resource");

// resource.create({name: 'test3'}).then(() => {
//     resource.findAll({attributes: ['id'],raw:true}).then(result=>console.log(result));
// });
//resource.findAll().then(result=>console.log(result));






