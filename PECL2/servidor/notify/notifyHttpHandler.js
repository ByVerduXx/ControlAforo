const { to } = require('../tools/to')
const httpContext = require('express-http-context');
const notifyController = require('./notifyController')


const sendNotification = async (req, res) => {
    
    const userid = httpContext.get('userid')
    const username = httpContext.get('user')
    let [err, resp] = await to(notifyController.notificar(userid, username));
    if (err) {
        return res.status(400).json({ message: err })
    }
    return res.status(201).json({ message: resp })
    
}

exports.sendNotification = sendNotification;