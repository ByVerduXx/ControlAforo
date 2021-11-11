const express = require('express');
const middlewares = require('./middlewares');
//routes
const authRoutes = require('./auth/auth.router').router;

const app = express();

const port = 5000;

middlewares.setupMiddlewares(app);

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/auth', authRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

exports.app = app;

