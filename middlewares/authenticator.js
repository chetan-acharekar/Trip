var errorcodes = require('../helpers/errorcode.js');

module.exports = function (req, res, next) {
    if (req.get('x-access-token') == 'password') {
        next()
    } else {
        res.json({
            'IsError': true,
            'Message': errorcodes.AuthFail
        }).status(500)
    }
}