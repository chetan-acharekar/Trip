var mongoose = require('mongoose'),
    tripmodel = require('../models/index.js').trip;


module.exports = {
    find: function (query, callback) {
        if (callback == null) {
            callback = query;
            query = null;
        }
        tripmodel.find(query, function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(null, response)
            }
        })
    },
    save: function (trip, callback) {
        var tripobject = new tripmodel(trip);
        tripobject.save(function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(null, response)
            }
        })
    }
}