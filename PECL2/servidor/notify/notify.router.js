const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware').authMiddleware
const notifyHttpHandler = require('./notifyHttpHandler')

router.route('/')
    .post(authMiddleware, notifyHttpHandler.sendNotification);
    
exports.router = router;