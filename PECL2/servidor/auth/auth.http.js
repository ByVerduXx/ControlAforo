const usersController = require('./users.controller')
const jwt = require('jsonwebtoken')
const {to} = require('../tools/to')
const httpContext =  require('express-http-context');

const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data 1'})
    } else if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Missing data 2'})
    }
    let [err, resp] = await to(usersController.checkUserCredentials(req.body.username, req.body.password));
    if (err || !resp) {
        return res.status(401).json({message: 'Invalid credentials'})
    }
    let userid = await usersController.getUserIdFromUserName(req.body.username)
    let token = jwt.sign({userid: userid, username: req.body.username}, 'secretPassword');
    res.status(200).json(
        {token: token}
    )
}

const registerUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'})
    } else if (!req.body.username || !req.body.password || !req.body.age || !req.body.color) {
        return res.status(400).json({message: 'Missing data'})
    }

    let [err, resp] = await to(usersController.registerUser(req.body.username, req.body.password, req.body.age, req.body.color));
    if (err) {
        return res.status(401).json({message: err})
    }
    return res.status(201).json({message: resp})
}

const getUsers = async (req, res) => {
    let [err, resp] = await to(usersController.getAllUsers());
    if (err) {
        return res.status(401).json({message: err})
    }
    return res.status(200).json({message: resp})
}

const getUserProfile = async (req, res) => {
    if (httpContext.get('user') !== req.params.username) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    let [err, resp] = await to(usersController.getUserIdFromUserName(req.params.username));
    if (err) {
        return res.status(400).json({message: err})
    }
    let [err2, resp2] = await to(usersController.getUser(resp));
    if (err2) {
        return res.status(400).json({message: err2})
    }
    return res.status(200).json(resp2)
}

const updateUserProfile = async (req, res) => {
    if (httpContext.get('user') !== req.params.username) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'})
    } else if (!req.body.password || !req.body.age || !req.body.color) {
        return res.status(400).json({message: 'Missing data'})
    }
    let [err, resp] = await to(usersController.getUserIdFromUserName(req.params.username));
    if (err) {
        return res.status(400).json({message: err})
    }
    let [err2, resp2] = await to(usersController.updateUser(resp, req.params.username, req.body.password, req.body.age, req.body.color));
    if (err2) {
        return res.status(400).json({message: err2})
    }
    return res.status(200).json({message: resp2})
}

const deleteUserProfile = async (req, res) => {
    if (httpContext.get('user') !== req.params.username) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    let [err, resp] = await to(usersController.getUserIdFromUserName(req.params.username));
    if (err) {
        return res.status(400).json({message: err})
    }
    let [err2, resp2] = await to(usersController.deleteUserProfile(resp));
    if (err2) {
        return res.status(400).json({message: err2})
    }
    return res.status(200).json({message: resp2})
}

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.getUsers = getUsers;
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
exports.deleteUserProfile = deleteUserProfile;