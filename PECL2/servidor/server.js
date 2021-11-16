const express = require('express');
const httpContext = require('express-http-context');
const bodyParser = require('body-parser');
//routes
const authRoutes = require('./auth/auth.router').router;
const userMiddleware =  require('./middlewares/userMiddleware').userMiddleware;

const app = express();

const port = 5000;

app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(httpContext.middleware);
app.use(userMiddleware)

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/auth', authRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

exports.app = app;

