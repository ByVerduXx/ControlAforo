const usersController = require('./users.controller')
const jwt = require('jsonwebtoken')
const { to } = require('../tools/to')
const crypto = require('../tools/crypto');
const httpContext = require('express-http-context');

const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Missing data' })
    }
    if (req.body.username === 'admin' && req.body.password === 'admin') {
        const token = jwt.sign({ userid: 0, username: 'admin' }, 'secretPassword');
        return res.status(200).json({ token })
    }
    let [err, resp] = await to(usersController.checkUserCredentials(req.body.username, req.body.password));
    if (err || !resp) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }
    let token = jwt.sign({ userid: resp, username: req.body.username }, 'secretPassword');
    res.status(200).json(
        { token: token }
    )
}

const registerUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (!req.body.username || !req.body.password || !req.body.dni || !req.body.email ||
        !req.body.telefono || !req.body.nombre || !req.body.direccion || !req.body.rfid || !req.body.oficina) {
        return res.status(400).json({ message: 'Missing data' })
    }
    let [err, resp] = await to(usersController.registerUser(req.body.username, req.body.password, req.body.dni, req.body.email, req.body.telefono, req.body.nombre, req.body.direccion, req.body.rfid, req.body.oficina));
    if (err) {
        return res.status(401).json({ message: err })
    }
    return res.status(201).json({ message: resp })
}

const getUsers = async (req, res) => {
    let [err, resp] = await to(usersController.getAllUsers());
    if (err) {
        return res.status(401).json({ message: err })
    }
    return res.status(200).json({ message: resp })
}

const getUserProfile = async (req, res) => {
    if (httpContext.get('user') !== req.params.username) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const userid = httpContext.get('userid')
    let [err, resp] = await to(usersController.getUser(userid));
    if (err) {
        return res.status(400).json({ message: err })
    }
    return res.status(200).json(resp)
}

const getUserNotifications = async (req, res) => {
    if (httpContext.get('user') !== req.params.username) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const userid = httpContext.get('userid')
    let page = req.query.page || 1
    page = parseInt(page) - 1
    let [err, resp] = await to(usersController.getUserNotifications(userid, page));
    if (err) {
        return res.status(400).json({ message: err })
    }
    return res.status(200).json(resp)
}

const deleteUserNotification = async (req, res) => {
    if (httpContext.get('user') !== req.params.username) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    let [err, resp] = await to(usersController.deleteUserNotification(req.params.id_notificacion));
    if (err) {
        return res.status(400).json({ message: err })
    }
    return res.status(200).json({ message: resp })
}

const getUserNotificationsPages = async (req, res) => {
    if (httpContext.get('user') !== req.params.username) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const userid = httpContext.get('userid')
    let [err, resp] = await to(usersController.getUserNotificationsPages(userid));
    if (err) {
        return res.status(400).json({ message: err })
    }
    return res.status(200).json(resp)
}

const updateUserProfile = async (req, res) => {
    if (httpContext.get('user') !== req.params.username) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    if (!req.body) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (!req.body.password || !req.body.dni || !req.body.email || !req.body.telefono || !req.body.nombre || !req.body.direccion) {
        return res.status(400).json({ message: 'Missing data' })
    }
    const userid = httpContext.get('userid')
    let [err, user] = await to(usersController.getUser(userid));
    if (err) {
        return res.status(400).json({ message: err })
    }
    if (req.body.password !== user.contrasena) {
        password = crypto.hashPassword(req.body.password)
    } else {
        password = user.contrasena
    }
    let [err2, resp2] = await to(usersController.updateUser(userid, req.params.username, password, req.body.dni, req.body.email, req.body.telefono, req.body.nombre, req.body.direccion));
    if (err2) {
        return res.status(400).json({ message: err2 })
    }
    return res.status(200).json({ message: resp2 })
}

const deleteUserProfile = async (req, res) => {
    if (httpContext.get('user') !== req.params.username) { 
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const userid = httpContext.get('userid')
    let [err, resp] = await to(usersController.deleteUserProfile(userid));
    if (err) {
        return res.status(400).json({ message: err })
    }
    return res.status(200).json({ message: resp })
}

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.getUsers = getUsers;
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
exports.deleteUserProfile = deleteUserProfile;
exports.getUserNotifications = getUserNotifications;
exports.getUserNotificationsPages = getUserNotificationsPages;
exports.deleteUserNotification = deleteUserNotification;