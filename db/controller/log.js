var mongoose = require('mongoose'),
    logmodel = require('../models/index.js').log;

module.exports = {
    increameaneCount: function (countInput, callback) {
        logmodel.find({}, function (error, response) {
            logmodel.update({}, {
                    'siteVisitCount': response.length === 0 ? countInput : response[0]._doc.siteVisitCount + countInput
                }, {
                    upsert: true
                },
                function (error, response) {
                    callback(error, response);
                })
        });
    }
}