const httpContext = require('express-http-context');

const authMiddleware = (req, res, next) => {
    if (httpContext.get('user')) {
        next();
    } else {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

exports.authMiddleware = authMiddleware;