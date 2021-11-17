const express = require('express');
const httpContext = require('express-http-context');
const bodyParser = require('body-parser');
const cors = require('cors');
//routes
const authRoutes = require('./auth/auth.router').router;
const userMiddleware =  require('./middlewares/userMiddleware').userMiddleware;

const app = express();

const port = 5000;

app.use(bodyParser.json());

app.use(cors());
app.use(httpContext.middleware);
app.use(userMiddleware)

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/auth', authRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`));

exports.app = app;

