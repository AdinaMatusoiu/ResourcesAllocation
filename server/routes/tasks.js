const route = require('express').Router();
const auth = require('../auth');

route.get('/enums', auth, (_, res) => {
    res.send({
        type: ['bugfix', 'issue', 'feature'],
        status: ['open', 'closed'],
        priority: ['low', 'medium', 'high_on_mushrooms'],
    })
})

module.exports = route;