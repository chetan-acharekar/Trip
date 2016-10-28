'use strict';

var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/uploads')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        }
    }),
    upload = multer({ //multer settings
        storage: storage
    }),
    imagedbCtrl = require('../db/controller/index.js').image;


router.get('/', function (req, res) {
    imagedbCtrl.find(function (error, response) {
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
    imagedbCtrl.find(query, function (error, response) {
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json(response[0]);
        }
    });
}).post('/', upload.any(), function (req, res) {
    var images = [];
    for (var i = 0; i < req.files.length; i++) {
        images.push({
            createdBy: req.body.createdBy,
            name: req.files[0].filename,
            'tag': req.body.tag,
            createdOn: new Date()
        });
    };
    imagedbCtrl.save(images, function (error, response) {
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json({
                "IsError": false,
                "Message": "Images Added successfully"
            });
        }
    })
}).get('/distinct/tag', function (req, res) {
    var field = 'tag';
    imagedbCtrl.distinct(field, function (error, response) {

        debugger;
        if (error) {
            res.send({
                'error': error
            }).status(500);
        } else {
            res.json(response);
        }
    });
})
module.exports = router;