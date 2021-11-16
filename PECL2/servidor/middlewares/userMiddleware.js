const httpContext = require('express-http-context');
const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, 'secretPassword', (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                httpContext.set('user', decoded.username);
                next();
            }
        });
    } else {
        httpContext.set('user', null);
        next()
    }

}

exports.userMiddleware = userMiddleware;