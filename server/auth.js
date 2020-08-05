const jwt = require('jsonwebtoken');
const { secret } = require('./config/config');

module.exports.managerPermission = (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send();
            } else if(decoded.user_role === 'manager'){
                req.decoded = decoded;
                next();
            } else {
                res.status(401).send();
            }
        });
    } else {
        res.status(401).send();
    }
}

module.exports.authenticated = (req, res, next) => {
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