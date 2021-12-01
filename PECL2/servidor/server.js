const express = require('express');
const httpContext = require('express-http-context');
const cors = require('cors');
const MqttHandler = require('./mqtt/mqtt_handler');
//routes
const authRoutes = require('./auth/auth.router').router;
const userMiddleware =  require('./middlewares/userMiddleware').userMiddleware;

const app = express();

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(httpContext.middleware);
app.use(userMiddleware)

const mqttClient = new MqttHandler();
mqttClient.connect();

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/auth', authRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`));

exports.app = app;

