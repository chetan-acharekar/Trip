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
    },
    addUserToTrip: function (tripId, userId, callback) {
        let query = {
            '_id': tripId
        };

        tripmodel.update(query, {
            '$addToSet': {
                'participants': userId
            }
        }, (err, response) => {
            debugger;
            if (err) {
                callback(err)
            } else {
                callback()
            }
        });
    },
    removeUserFromTrip: function (tripId, userId, callback) {
        let query = {
            '_id': tripId
        };
        debugger;
        tripmodel.update(query, {
            '$pull': {
                'participants': userId
            }
        }, (err, response) => {
            debugger;
            if (err) {
                callback(err)
            } else {
                callback()
            }
        });
    }
}