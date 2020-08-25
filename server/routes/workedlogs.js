const route = require('express').Router();
const { authenticated } = require('../auth');
const WorkLog = require('../models/WorkLog');
const { getDate } = require('../utils');
route.post('/', authenticated, (req, res) => {
    const { description, from, to, date, worked, task_id } = req.body;
    if (description && from && to && date && worked) {
        WorkLog.create({ description, from, to, worked, task_id, date: getDate(date) }).then(created => {
            res.send(created);
        }).catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Internal server error!' });
        });
    } else {
        res.status(400).send({ message: 'Wrong body format!' });
    }
})

module.exports = route;

