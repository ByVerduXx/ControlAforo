const express = require('express');
const router = express.Router();
const usersHttpHandler = require('./users.http')
const authMiddleware = require('../middlewares/authMiddleware').authMiddleware


router.route('/')
    .get(usersHttpHandler.getUsers);

router.route('/login')
    .post(usersHttpHandler.loginUser);

router.route('/register')
    .post(usersHttpHandler.registerUser);

router.route('/profile/:username')
    .get(authMiddleware,usersHttpHandler.getUserProfile)
    .put(authMiddleware,usersHttpHandler.updateUserProfile)
    .delete(authMiddleware ,usersHttpHandler.deleteUserProfile);

router.route('/:username/notifications')
    .get(authMiddleware,usersHttpHandler.getUserNotifications)
exports.router = router;
