const uuid = require('uuid');
const {to} = require('../tools/to')
const { getDateString, dateToString } = require('../tools/date')

const db = require('../database/dbconnection') 

const notificar = (userid) => {
    return new Promise((resolve, reject) => {
        const id_positivo = uuid.v4()
        const date = getDateString();
        db.insertPositivo(id_positivo, userid, date).then(() => {
            db.getUsersLogLastWeek(userid).then((data) => {
                if (data) {
                    let listaNotificados = []
                    data.forEach(element => {
                        let entrada = dateToString(new Date(element.entrada))
                        let salida = dateToString(new Date(element.salida))
                        db.getUsuariosInContactWithPositive(entrada, salida).then((usuarios) => {
                            if (usuarios) {
                                usuarios.forEach(element => {
                                    if (listaNotificados.indexOf(element.id_usuario) == -1) {
                                        listaNotificados.push(element.id_usuario)
                                        const id_notificacion = uuid.v4()
                                        db.insertNotification(id_notificacion, element.id_usuario, id_positivo).then(() => {
                                            //notificar por mqtt
                                        })
                                    }
                                });
                                return resolve(listaNotificados)
                            }
                        }).catch((err) => {
                            return reject(err)
                        })
                    })
                } else {
                    return reject('Data not found for that user')
                }
            }).catch((err) => {
                return reject(err)
            })
        }).catch((err) => {
            return reject(err)
        })
    })
}

exports.notificar = notificar;