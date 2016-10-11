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
    },
    update: function (tripID, updates, callback) {
        var query = {
                '_id': tripID
            },
            update = {
                $set: updates
            },
            options = null;
        tripmodel.update(query, update, options, function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(null, response)
            }
        });
    },
    remove: function (tripID, callback) {
        var query = {
            '_id': tripID
        };
        tripmodel.remove(query, function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(null)
            }
        });
    }
}