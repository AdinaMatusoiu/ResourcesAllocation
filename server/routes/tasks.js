const route = require('express').Router();
const auth = require('../auth');
const Task = require('../models/Task');

const enums = {
    type: ['bugfix', 'issue', 'feature'],
    status: ['open', 'closed'],
    priority: ['low', 'medium', 'high_on_mushrooms'],
}

route.get('/enums', auth, (_, res) => {
    res.send(enums)
})

route.post('/', auth, (req, res) => {
    const { user_id, user_role } = req.decoded;
    if (user_role === 'manager') {
        const { name, description, status, type, priority } = req.body;
        if (name && description && status && type && priority && enums.type.indexOf(type) !== -1 && enums.status.indexOf(status) !== -1 && enums.priority.indexOf(priority) !== -1) {
            Task.findOne({ where: { user_id, name } }).then(task => {
                if (!task) {
                    Task.create({ name, description, status, type, priority, user_id })
                        .then(() => res.status(201).send())
                        .catch(err => {
                            console.log(err);
                            res.status(500).send({ message: 'Internal server error' });
                        })
                } else {
                    res.status(409).send({ message: 'A task with this name already exists!' });
                }
            })

        } else {
            res.status(400).send({ message: 'Wrong body format' });
        }
    } else {
        res.status(401).send();
    }
})

module.exports = route;