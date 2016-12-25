var mongoose = require('mongoose'),
    logmodel = require('../models/index.js').log;

module.exports = {
    increameaneCount: function (callback) {
        logmodel.find({}, function (error, response) {
            console.log(response.length === 0 ? 0 : response[0]._doc.siteVisitCount);
            logmodel.update({}, {
                    'siteVisitCount': response.length === 0 ? 0.5 : response[0]._doc.siteVisitCount + 0.5
                }, {
                    upsert: true
                },
                function (error, response) {
                    callback(error, response);
                })
        });
    }
}