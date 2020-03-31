const Sequelize = require('sequelize');
const config=require('./config');
module.exports=new Sequelize(config.dbName,config.dbUser,config.dbPassword,{
    host:config.dbHost,
    dialect:config.dbDialect,
    dialectOptions: {
        multipleStatements: true
    }
}
)