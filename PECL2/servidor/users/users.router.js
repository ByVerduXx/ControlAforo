const express = require('express');
const router = express.Router();
const authHttpHandler = require('./users.http')
const authMiddleware = require('../middlewares/authMiddleware').authMiddleware


router.route('/')
    .get(authHttpHandler.getUsers);

router.route('/login')
    .post(authHttpHandler.loginUser);

router.route('/register')
    .post(authHttpHandler.registerUser);

router.route('/profile/:username')
    .get(authMiddleware,authHttpHandler.getUserProfile)
    .put(authMiddleware,authHttpHandler.updateUserProfile)
    .delete(authMiddleware ,authHttpHandler.deleteUserProfile);

exports.router = router;
