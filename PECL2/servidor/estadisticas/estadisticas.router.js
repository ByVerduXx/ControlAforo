const express = require('express');
const router = express.Router();
const estadisticasHttpHandler = require('./estadisticas.http');
const authMiddleware = require('../middlewares/authMiddleware').authMiddleware

router.route('/')
    .get(authMiddleware,estadisticasHttpHandler.getEstadisticas);

exports.router = router;