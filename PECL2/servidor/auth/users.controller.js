const uuid = require('uuid');
const crypto = require('../tools/crypto');


let userDatabase = {}

const cleanUpUsers = () => {
    return new Promise((resolve, reject) => {
        userDatabase = {}
        resolve()
    })

}

const registerUser = (username, password, age, color) => {
    return new Promise((resolve, reject) => {
        getUserIdFromUserName(username).then(() => {
            return reject('User already exists')
        }).catch(() => {
            let hashedPassword = crypto.hashPassword(password)
            let userid = uuid.v4()
            let newUser = {
                username: username,
                password: hashedPassword,
                age: age,
                color: color,
            }
            userDatabase[userid] = newUser
            return resolve(`User ${username} created successfully`)
        })
    })
}

const getUser = (userid) => {
    return new Promise((resolve, reject) => {
        if (userDatabase[userid]) {
            resolve(userDatabase[userid])
        } else {
            reject()
        }
    })
}

const getUserIdFromUserName = (username) => {
    return new Promise((resolve, reject) => {
        for (let userid in userDatabase) {
            if (userDatabase[userid].username === username) {
                return resolve(userid)
            }
        }
        return reject('No user found')
    })
}

const checkUserCredentials = (username, password) => {
    return new Promise(async (resolve, reject) => {
        let userid = await getUserIdFromUserName(username)
        let user = await getUser(userid)
        if (user) {
            crypto.comparePassword(password, user.password, (err, same) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(same)
                }
            })
        } else {
            reject('No user found')
        }

    })
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        resolve(userDatabase)
    })
}

registerUser('Verdu', 'verdu1234', '20', 'Rojo')
registerUser('Juan', 'juan1234', '20', 'Azul')
registerUser('Pedro', 'pedro1234', '20', 'Verde')


exports.cleanUpUsers = cleanUpUsers
exports.registerUser = registerUser
exports.getUser = getUser
exports.getUserIdFromUserName = getUserIdFromUserName
exports.checkUserCredentials = checkUserCredentials
exports.getAllUsers = getAllUsers
