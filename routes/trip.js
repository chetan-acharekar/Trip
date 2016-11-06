'use strict';

var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/uploads')
        },
        filename: function (req, file, cb) {
            debugger;
            cb(null, req.body.title + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        }
    }),
    upload = multer({ //multer settings
        storage: storage
    }),
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
}).post('/', upload.any(), function (req, res) {
    var trip = {
        'title': req.body.title,
        'createdBy': req.body.createdBy,
        'createdOn': new Date(),
        'participants': [],
        'description': req.body.description,
        'intro': req.body.intro,
        'type': req.body.type,
        'image': req.files[0].filename
    };
    debugger;
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
}).put('/:id', function (req, res) {
    tripdbCtrl.update(req.params.id, req.body, function (error, response) {
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json({
                "IsError": false,
                "Message": "Trip updated successfully",
                "Result": response
            });
        }
    });
}).delete('/:id', function (req, res) {
    tripdbCtrl.remove(req.params.id, function (error) {
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json({
                "IsError": false,
                "Message": "Trip Deleted successfully"
            });
        }
    });
})

module.exports = router;