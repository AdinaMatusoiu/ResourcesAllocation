const route = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = require('../config/config').saltRounds;
// bcrypt.hash(text).then(function(hash) {
// 
// })

route.post('/login', (req, res) => {
    User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password_hash).then(result => {
                if (result) {
                    res.send({ message: 'Success' });
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

route.post('/register', (req, res) => {
    User.findOne({ where: { email: req.body.email } }).then(function (user) {
        if (user) {
            res.send({ message: 'Email already exists' });
        } else {
            bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
                User.create({ email: req.body.email, password_hash: hash }).then(function () {
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


// banane
// altCuvant
// a342KJJFL231.SD#2
// hash(banane) = a342KJJFL231.SD#2


// email: 'cutare', parola: 'parola'
// hash('parola').then(hash => {

// })