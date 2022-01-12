const express = require('express');

require('dotenv').config();

const httpContext = require('express-http-context');
const cors = require('cors');
const { client } = require('./mqtt/mqtt_handler');

//routes
const usersRoutes = require('./users/users.router').router;
const notifyRoutes = require('./notify/notify.router').router;
const oficinasRoutes = require('./oficinas/oficinas.router').router;
const estadisticasRoutes = require('./estadisticas/estadisticas.router').router;

const userMiddleware =  require('./middlewares/userMiddleware').userMiddleware;

const db = require('./database/dbconnection');
const mqtt = require('./mqtt/mqtt_handler').client;

const app = express();

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(httpContext.middleware);
app.use(userMiddleware)


app.get('/', (req, res) => {
    res.send('Hello World!')
    mqtt.publish('test', 'Hello World!');
});


app.use('/users', usersRoutes);
app.use('/notify', notifyRoutes);
app.use('/oficinas', oficinasRoutes);
app.use('/estadisticas', estadisticasRoutes);


app.listen(port, () => console.log(`Server listening on port ${port}!`));

exports.app = app;

