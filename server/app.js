const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasks = require('./routes/tasks');
const users = require('./routes/users');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/tasks', tasks);
app.use('/users', users);

module.exports = app;



