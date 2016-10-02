'use strict';

var express = require('express'),
    router = express.Router(),
    userdbCtrl = require('../db/controller/index.js').user;

router.post('/', function (req, res) {
    var userobject = {
        "username": req.body.username,
        "password": req.body.password
    };
    userdbCtrl.find(userobject, function (error, response) {
        if (error) {
            res.send({
                'error': error,
                "IsError": true
            }).status(500);
        } else if (response.length === 0) {
            res.send({
                'error': "User validation failed",
                "IsError": true
            })
        } else {
            res.json({
                "IsError": false,
                "Message": "User validated"
            });
        }
    })

});

module.exports = router;