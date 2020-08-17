const route = require('express').Router();
const { authenticated, managerPermission } = require('../auth');
const Task = require('../models/Task');
const User = require('../models/User');


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
    const { name, description, type, priority } = req.body;
    if (name && description && type && priority && enums.type.indexOf(type) !== -1 && enums.priority.indexOf(priority) !== -1) {
        Task.findOne({ where: { creator_id: user_id, name } }).then(task => {
            if (!task) {
                Task.create({ name, description, type, priority, status: 'open', creator_id: user_id })
                    .then(() => res.status(201).send())
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

// router.get('/tasks', (req, res) => {
//     Task.findAll().then(task => {
//         res.send(task);
//     }).catch(error => {
//         console.log(error);
//         res.status(500).send({ message: 'Something went wrong. Try again later.' })
//     });
// })

module.exports = route;