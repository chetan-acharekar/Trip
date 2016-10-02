'use strict';

var express = require('express'),
    router = express.Router(),
    userdbCtrl = require('../db/controller/index.js').user,
    auth = require('../middlewares/authenticator.js');

router.use(auth);

router.post('/', function (req, res) {
    var adminObject = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "mail": req.body.mail,
        "password": req.body.password,
        "IsAdmin": true
    }
    userdbCtrl.save(adminObject, function (error, response) {
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json({
                "IsError": false,
                "Message": "User created successfully!"
            });
        }
    })

});

module.exports = router;