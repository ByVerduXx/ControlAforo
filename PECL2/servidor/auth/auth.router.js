const express = require('express');
const router = express.Router();
const authHttpHandler = require('./auth.http')
const authMiddleware = require('../middlewares/authMiddleware').authMiddleware


router.route('/login')
    .post(authHttpHandler.loginUser);

router.route('/register')
    .post(authHttpHandler.registerUser);

router.route('/users')
    .get(authHttpHandler.getUsers);

router.route('/profile/:username')
    .get(authMiddleware,authHttpHandler.getUserProfile)
    .put(authMiddleware,authHttpHandler.updateUserProfile)
    .delete(authMiddleware ,authHttpHandler.deleteUserProfile);

exports.router = router;
