const express = require('express');

require('dotenv').config();

const httpContext = require('express-http-context');
const cors = require('cors');
const { client } = require('./mqtt/mqtt_handler');

//routes
const usersRoutes = require('./users/users.router').router;
const notifyRoutes = require('./notify/notify.router').router;
const userMiddleware =  require('./middlewares/userMiddleware').userMiddleware;

const db = require('./database/dbconnection');

const app = express();

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(httpContext.middleware);
app.use(userMiddleware)


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/oficina', (req, res) => {
    db.getOficinas().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json(err);
    });
})

app.get('/oficina/:id_oficina/aforo_actual', (req, res) => {
    const id_oficina = req.params.id_oficina;
    db.getActualOfficeCapacity(id_oficina).then(result => {
        res.status(200).json({aforo: result});
    }).catch(err => {
        res.status(500).send(err);
    });
})

app.get('/oficina/:id_oficina/max_aforo', (req, res) => {
    const id_oficina = req.params.id_oficina;
    db.getMaxAforo(id_oficina).then(result => {
        res.status(200).json({aforo: result});
    }).catch(err => {
        res.status(500).send(err);
    });
})

app.use('/users', usersRoutes);
app.use('/notify', notifyRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`));

exports.app = app;

