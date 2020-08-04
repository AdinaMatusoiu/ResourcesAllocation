const jwt = require('jsonwebtoken');
const secret = require('./config/config');

module.exports = (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split('Bearer ')[1];
        const payload = jwt.decode(token);
        if (payload) {
            next();
        } else {
            res.status(401).send();
        }
    } else {
        res.status(401).send();
    }
}