'use strict';

var express = require('express'),
    router = express.Router(),
    tripdbCtrl = require('../db/controller/index.js').trip;


router.get('/', function (req, res) {
    tripdbCtrl.find(function (error, response) {
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
    tripdbCtrl.find(query, function (error, response) {
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json(response[0]);
        }
    });
}).post('/', function (req, res) {
    var trip = {
        'title': req.body.title,
        'createdBy': req.body.createdBy,
        'createdOn': new Date(),
        'participants': [],
        'description': req.body.description
    }
    tripdbCtrl.save(trip, function (error, response) {
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json({
                "IsError": false,
                "Message": "Trip created successfully!",
                "Result": response
            });
        }
    })
})

module.exports = router;