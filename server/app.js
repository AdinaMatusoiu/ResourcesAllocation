const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasks = require('./routes/tasks');
const users = require('./routes/users');
const reports = require('./routes/reports');
const workedlogs = require('./routes/workedlogs');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/tasks', tasks);
app.use('/users', users);
app.use('/reports', reports);
app.use('/workedlogs', workedlogs);

module.exports = app;



