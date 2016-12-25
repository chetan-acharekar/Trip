'use strict';

var express = require('express'),
    router = express.Router(),
    logCtrl = require('../db/controller/index.js').log;

router.post('/count', function (req, res) {
    res.send({
        "IsError": false
    });
    logCtrl.increameaneCount(req.body.count, function (error, response) {})
})

module.exports = router;