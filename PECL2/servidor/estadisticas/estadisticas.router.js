const express = require('express');
const router = express.Router();
const estadisticasHttpHandler = require('./estadisticas.http');
const authMiddleware = require('../middlewares/authMiddleware').authMiddleware

router.route('/')
    .get(authMiddleware,estadisticasHttpHandler.getEstadisticas);

router.route('/positivos')
    .get(authMiddleware,estadisticasHttpHandler.getPositivos);

router.route('/aforo_hora')
    .get(authMiddleware,estadisticasHttpHandler.getAforoHora);

exports.router = router;