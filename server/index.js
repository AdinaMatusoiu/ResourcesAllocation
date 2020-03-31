const db=require("./config/db");
db.authenticate();

db.query("select * from resources").then(result => console.log(result));