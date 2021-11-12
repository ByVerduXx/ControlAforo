const express = require('express');
const router = express.Router();
const authHttpHandler = require('./auth.http')


router.route('/login')
    .post(authHttpHandler.loginUser);

router.route('/register')
    .post(authHttpHandler.registerUser);

router.route('/users')
    .get(authHttpHandler.getUsers);

router.route('/profile/:username')
    .get(authHttpHandler.getUserProfile)
    .put(authHttpHandler.updateUserProfile)
    .delete(authHttpHandler.deleteUserProfile);

exports.router = router;
