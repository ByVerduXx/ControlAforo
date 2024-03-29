const uuid = require('uuid');
const crypto = require('../tools/crypto');
const {to} = require('../tools/to')

const db = require('../database/dbconnection') 


const registerUser = (username, password, dni, email, telefono, nombre, direccion, rfid, oficina) => {
    return new Promise((resolve, reject) => {
        db.getUserIdFromUserName(username).then(() => {
            return reject('El usuario ya existe')
        }).catch(async () => {
            let hashedPassword = crypto.hashPassword(password)
            let userid = uuid.v4()
            let [err, data] = await to(db.insertUser(userid, username, hashedPassword, dni, email, telefono, nombre, direccion));
            if (err) {
                return reject('Error al registrar el usuario')
            } else {
                let [err2, data2] = await to(db.insertRfid(rfid, userid, oficina))
                if (err2) {
                    return reject('Error al registrar el rfid')
                } else {
                    return resolve(`User ${username} created successfully`)
                }
            }
            
        })
    })
}

const getUser = (userid) => {
    return new Promise((resolve, reject) => {
        db.getUserProfile(userid).then((user) => {
            if (user) {
                return resolve(user)
            } else {
                return reject('User not found')
            }
        }).catch((err) => {
            return reject(err)
        })
    })
}

const getUserNotifications = (userid, page) => {
    return new Promise((resolve, reject) => {
        const limit = page * 4;
        db.getUserNotifications(userid, limit).then((notifications) => {
            if (notifications) {
                return resolve(notifications)
            } else {
                return reject('User not found')
            }
        }).catch((err) => {
            return reject(err)
        })
    })
}

const getUserNotificationsPages = (userid) => {
    return new Promise((resolve, reject) => {
        db.getUserNotificationsPages(userid).then((response) => {
            if (response) {
                return resolve(response)
            } else {
                return reject('User not found')
            }
        }).catch((err) => {
            return reject(err)
        })
    })
}

const deleteUserNotification = (id_notificacion) => {
    return new Promise((resolve, reject) => {
        db.deleteNotification(id_notificacion).then(() => {
            return resolve('Notificacion eliminada')
        }).catch((err) => {
            return reject(err)
        })
    })
}


const checkUserCredentials = (username, password) => {
    return new Promise(async (resolve, reject) => {
        db.getUserIdFromUserName(username)
            .then(async (userid) => {
                let [err,pass] = await to(db.getPassword(userid))
                if (err) {
                    return reject(err)
                } else {
                    crypto.comparePassword(password, pass, (err, result) => {
                        if (err || !result) {
                            return reject(err)
                        } else {
                            return resolve(userid)
                        }
                    })
                }
            })
            .catch((err) => {
                return reject(err)
            })
    })
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.getUsers().then((users) => {
            //console.log(users)
            return resolve(users)
        }).catch((err) => {
            return reject(err)
        })
    })
}

const updateUser = (userid, username, password, dni, email, telefono, nombre, direccion) => {
    return new Promise((resolve, reject) => {
        db.updateUserProfile(userid, username, password, dni, email, telefono, nombre, direccion).then(() => {
            return resolve('User updated successfully')
        }).catch((err) => {
            return reject(err)
        })
    })
}

const deleteUserProfile = (userid) => {
    return new Promise((resolve, reject) => {
        db.deleteUserProfile(userid).then(() => {
            return resolve('User deleted successfully')
        }).catch((err) => {
            return reject(err)
        })
    })
}


exports.registerUser = registerUser
exports.getUser = getUser
exports.checkUserCredentials = checkUserCredentials
exports.getAllUsers = getAllUsers
exports.updateUser = updateUser
exports.deleteUserProfile = deleteUserProfile
exports.getUserNotifications = getUserNotifications
exports.getUserNotificationsPages = getUserNotificationsPages
exports.deleteUserNotification = deleteUserNotification
