const uuid = require('uuid');
const crypto = require('../tools/crypto');
const {to} = require('../tools/to')

const db = require('../database/dbconnection') 


const registerUser = (username, password, dni, email, telefono, nombre, direccion) => {
    return new Promise((resolve, reject) => {
        db.getUserIdFromUserName(username).then(() => {
            return reject('El usuario ya existe')
        }).catch(async () => {
            let hashedPassword = crypto.hashPassword(password)
            let userid = uuid.v4()
            let [err, data] = await to(db.insertUser(userid, username, hashedPassword, dni, email, telefono, nombre, direccion));
            if (err) {
                return reject(err)
            } else {
                return resolve(`User ${username} created successfully`)
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
