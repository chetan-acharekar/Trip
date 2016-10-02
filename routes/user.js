'use strict';

var express = require('express'),
    router = express.Router(),
    userdbCtrl = require('../db/controller/index.js').user;


router.get('/', function (req, res) {
    userdbCtrl.find(function (error, response) {
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json(response);
        }
    });
}).get('/:id', function (req, res) {
    var query = {
        '_id': req.params.id
    };
    userdbCtrl.find(query, function (error, response) {
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json(response[0]);
        }
    });
}).post('/', function (req, res) {
    userdbCtrl.save(req.body, function (error, response) {
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