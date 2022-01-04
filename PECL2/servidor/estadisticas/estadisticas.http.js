const estadisticasController = require('./estadisticas.controller')
const httpContext = require('express-http-context');

const getEstadisticas = async (req, res) => {
    if (httpContext.get('user') !== 'admin') {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    estadisticasController.getEstadisticas().then((estadisticas) => {
        return res.status(200).json(estadisticas)
    }).catch((err) => {
        return res.status(400).json({ message: err })
    })
}

exports.getEstadisticas = getEstadisticas;