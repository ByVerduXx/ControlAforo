const uuid = require('uuid');
const { getDateString, dateToString } = require('../tools/date')

const db = require('../database/dbconnection') 
const mqtt = require('../mqtt/mqtt_handler').client;

const notificar = (userid, username) => {
    return new Promise((resolve, reject) => {
        const id_positivo = uuid.v4()
        const date = getDateString();
        db.insertPositivo(id_positivo, userid, date).then(() => {
            db.getUsersLogLastWeek(userid).then((data) => {
                if (data) {
                    let listaNotificados = []
                    data.forEach(element => {
                        let entrada = dateToString(new Date(element.entrada))
                        let salida = element.salida !== null ? dateToString(new Date(element.salida)) : null
                        db.getUsuariosInContactWithPositive(entrada, salida).then((usuarios) => {
                            if (usuarios) {
                                usuarios.forEach(element => {
                                    if (listaNotificados.indexOf(element.id_usuario) == -1 && element.id_usuario != userid) {
                                        listaNotificados.push(element.id_usuario)
                                        const id_notificacion = uuid.v4()
                                        db.insertNotification(id_notificacion, element.id_usuario, id_positivo).then(() => {
                                            //notificar por mqtt
                                            mqtt.publish(`notificaciones/${element.username}`, username);
                                        })
                                    }
                                });
                                return resolve(listaNotificados)
                            }
                        }).catch((err) => {
                            return reject(err)
                        })
                    })
                }
            }).catch(() => {
                return resolve() //significa que no hay usuarios con los que no ha coincidido, por eso se hace un resolve
            })
        }).catch((err) => {
            return reject(err)
        })
    })
}

exports.notificar = notificar;