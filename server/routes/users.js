const route = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Task = require('../models/Task');
const saltRounds = require('../config/config').saltRounds;
const { secret } = require('../config/config');
const { managerPermission } = require('../auth');

route.post('/login', (req, res) => {
    User.findOne({ where: { email: req.body.email }, raw: true }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password_hash).then(result => {
                if (result) {
                    const token = jwt.sign({ user_id: user.id, user_role: user.user_role }, secret);
                    res.send({ message: 'Success', access_token: token, user_role: user.user_role });
                } else {
                    res.status(400).send({ message: 'Email or password is incorrect' });
                }
            }).catch(err => {
                console.log(err);
                res.status(500).send({ message: 'Internal server error!' });
            })
        } else {
            res.status(400).send({ message: 'Email or password is incorrect' });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Internal server error!' });
    })
})

route.get('/manager/resources', managerPermission, (req, res) => {
    const { user_id } = req.decoded;
    User.findAll({ attributes: ['id', 'name', 'email'], where: { manager_id: user_id } })
        .then(users => {
            res.send(users);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Internal server error!' });
        })
})

route.get('/manager/tasks', managerPermission, (req, res) => {
    const { user_id } = req.decoded;
    Task.findAll({ where: { creator_id: user_id } })
        .then(tasks => {
            res.send(tasks);
        }).catch(error => {
            console.log(error);
            res.status(500).send({ message: 'Internal server error!' });
        })
})

route.get('/managers', (req, res) => {
    User.findAll({ where: { user_role: 'manager' }, attributes: ['id', 'name'] })
        .then(users => res.send(users))
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Internal server error!' });
        })
})

route.post('/register', (req, res) => {
    const { name, email, password, user_role, manager_id } = req.body;
    User.findOne({ where: { email } }).then(function (user) {
        if (user) {
            res.send({ message: 'Email already exists' });
        } else {
            bcrypt.hash(password, saltRounds).then(function (hash) {
                User.create({ name, email, password_hash: hash, user_role, manager_id }).then(function () {
                    res.send({ message: 'Success!!' });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({ message: 'Internal server error!' });
                })
            }).catch(err => {
                console.log(err);
                res.status(500).send({ message: 'Internal server error!' });
            })
        }
    })
    // hash(req.body.password).then(function(hash) {
    // insert in tabela users cu email (req.body.email) si password_hash:hash
    // dupa res.send({message: 'success'});
    // })

})

module.exports = route;