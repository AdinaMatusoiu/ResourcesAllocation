const route = require('express').Router();
const { authenticated, managerPermission } = require('../auth');
const Task = require('../models/Task');
const User = require('../models/User');
const { getDate } = require('../utils');
const WorkLog = require('../models/WorkLog');

const enums = {
    type: ['bugfix', 'issue', 'feature'],
    status: ['open', 'closed'],
    priority: ['low', 'medium', 'high_on_mushrooms'],
}

route.get('/enums', authenticated, (_, res) => {
    res.send(enums)
})

route.post('/', managerPermission, (req, res) => {
    const { user_id } = req.decoded;
    const { name, description, type, priority, deadline } = req.body;
    if (name && description && type && priority && enums.type.indexOf(type) !== -1 && enums.priority.indexOf(priority) !== -1) {
        Task.findOne({ where: { creator_id: user_id, name } }).then(task => {
            if (!task) {
                Task.create({ name, description, type, priority, status: 'open', creator_id: user_id, deadline: deadline ? getDate(deadline) : null, creation_date: getDate(new Date().toLocaleDateString('en-us')) })
                    .then(created => res.status(201).send(created))
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({ message: 'Internal server error!' });
                    })
            } else {
                res.status(409).send({ message: 'A task with this name already exists!' });
            }
        })
    } else {
        res.status(400).send({ message: 'Wrong body format' });
    }
})

route.put('/', managerPermission, (req, res) => {
    const { resource_id, task_id } = req.body;
    Task.update({ resource_id }, { where: { id: task_id } })
        .then(() => res.status(200).send())
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Internal server error!' });
        })
})

// router.get('/tasks', (req, res) => {
//     Task.findAll().then(task => {
//         res.send(task);
//     }).catch(error => {
//         console.log(error);
//         res.status(500).send({ message: 'Something went wrong. Try again later.' })
//     });
// })

route.get('/:id/worklogs', authenticated, (req, res) => {
    const task_id = req.params.id;
    WorkLog.findAll({ where: { task_id }, raw: true }).then(result => res.send(result))
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Internal server error!' });
        })
})

module.exports = route;