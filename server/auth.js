const jwt = require('jsonwebtoken');
const { secret } = require('./config/config');

module.exports = (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send();
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).send();
    }
}