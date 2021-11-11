const usersController = require('./users.controller')
const jwt = require('jsonwebtoken')
const {to} = require('../tools/to')

const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'})
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'})
    }

    let [err, resp] = await to(usersController.checkUserCredentials(req.body.user, req.body.password));
    if (err || !resp) {
        return res.status(401).json({message: 'Invalid credentials'})
    }

    let userid = await usersController.getUserIdFromUserName(req.body.user);
    let token = jwt.sign({userid: userid}, 'secretPassword');
    res.status(200).json(
        {token: token}
    )
}

const registerUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'})
    } else if (!req.body.user || !req.body.password || !req.body.age || !req.body.color) {
        return res.status(400).json({message: 'Missing data'})
    }

    let [err, resp] = await to(usersController.registerUser(req.body.user, req.body.password, req.body.age, req.body.color));
    if (err) {
        return res.status(401).json({message: err})
    }
    return res.status(200).json({message: resp})
}

const getUsers = async (req, res) => {
    let [err, resp] = await to(usersController.getAllUsers());
    if (err) {
        return res.status(401).json({message: err})
    }
    return res.status(200).json({message: resp})
}

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.getUsers = getUsers;