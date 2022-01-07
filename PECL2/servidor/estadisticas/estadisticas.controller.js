const db = require('../database/dbconnection') 

const getEstadisticas = () => {
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

const getPositivos = (total) => {
    return new Promise((resolve, reject) => {
        if (total == 'false') {
            const año = new Date().getFullYear()
            db.getEstadisticasPositivosAño(año).then((estadisticas) => {
                if (estadisticas) {
                    return resolve(estadisticas)
                } else {
                    return reject('Estadisticas not found')
                }
            }).catch((err) => {
                return reject(err)
            })
        } else {
            db.getEstadisticasPositivosTotal().then((estadisticas) => {
                if (estadisticas) {
                    return resolve(estadisticas)
                } else {
                    return reject('Estadisticas not found')
                }
            }).catch((err) => {
                return reject(err)
            })
        }
    })
}

exports.getEstadisticas = getEstadisticas;
exports.getPositivos = getPositivos;