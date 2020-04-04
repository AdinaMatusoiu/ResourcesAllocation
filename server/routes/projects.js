const route = require('express').Router();
const Project = require('../models/Project');

route.get('/', (req, res) => {
    Project.findAll().then(function(projectsData){
        res.send(projectsData);
    })
})


module.exports=route;

// ./numeFisier
//server - models
//       - routes - projects.js