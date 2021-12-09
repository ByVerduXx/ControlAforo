const express = require('express');
const httpContext = require('express-http-context');
const cors = require('cors');
const { client } = require('./mqtt/mqtt_handler');
//routes
const usersRoutes = require('./users/users.router').router;
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

app.use('/users', usersRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`));

exports.app = app;

