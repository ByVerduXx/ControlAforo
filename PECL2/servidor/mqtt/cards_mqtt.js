const db = require('../database/dbconnection');
const { getDateString } = require('../tools/date')


const cardHandler = (cardid, client) => {
    //ver si la tarjeta está en la base de datos
    db.getCard(cardid).then(result => {
        if (result.length > 0) {
            //si esta, ver si esta dentro de la sala
            const id_usuario = result[0].id_usuario;
            db.isUserIn(id_usuario).then(result => {
                if (result) {
                    //si esta, sacarlo de la sala y pubclicar -1 en aforo y 1 en alerta
                    let date = getDateString();
                    db.takeUserOut(id_usuario, date).then(result => {
                        client.publish('aforo', '-1');
                        client.publish('alerta', '1');
                    }).catch(err => {
                        client.publish('alerta', '0');
                    });
                } else {
                    //si no esta, ver si el aforo está completo
                    db.getOfficeCapacityFromRfid(cardid).then(result => {
                        //si el aforo no esta completo, introducir tarjeta a la sala, mandar un 1 a aforo y un 1 a alerta
                        if (result > 0) {
                            let date = getDateString();
                            db.setUserIn(id_usuario, date).then(result => {
                                client.publish('aforo', '1');
                                client.publish('alerta', '1');
                            }).catch(err => {
                                client.publish('alerta', '0');
                            });
                        } else {
                            //si el aforo esta completo, mandar un 0 a alerta
                            client.publish('alerta', '0');
                        }
                    }).catch(err => {
                        client.publish('alerta', '0');
                    });
                }
            }).catch(err => {
                client.publish('alerta', '0')
            });        
        } else {
            client.publish('alerta', '0');
        }
    }).catch(err => {
        client.publish('alerta', '0');
    });
}

exports.cardHandler = cardHandler;
