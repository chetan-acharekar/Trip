'use strict';

var express = require('express'),
    router = express.Router(),
    chatdbCtrl = require('../db/controller/index.js').chat;


router.get('/', function (req, res) {
    chatdbCtrl.find(function (error, response) {
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json(response);
        }
    });
}).get('/trip/:id', function (req, res) {
    var query = {
        'tripID': req.params.id
    };
    chatdbCtrl.find(query, function (error, response) {
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json(response);
        }
    });
}).post('/', function (req, res) {
    var chatobject = {
        'message': req.body.message,
        'creator': req.body.creator,
        'createdOn': new Date(),
        'tripID': req.body.tripID
    };
    chatdbCtrl.save(chatobject, function (error, response) {
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
})

module.exports = router;