const express = require('express');
const bodyParser = require('body-parser');
const projects = require('./routes/projects');
const users = require('./routes/users');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/projects', projects);
app.use('/users', users);

module.exports = app;



