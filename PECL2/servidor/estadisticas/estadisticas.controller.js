const db = require('../database/dbconnection') 

const getEstadisticas = (req, res) => {
    return new Promise((resolve, reject) => {
        db.getEstadisticas().then((estadisticas) => {
            if (estadisticas) {
                return resolve(estadisticas)
            } else {
                return reject('Estadisticas not found')
            }
        }).catch((err) => {
            return reject(err)
        })
    })
}

exports.getEstadisticas = getEstadisticas;