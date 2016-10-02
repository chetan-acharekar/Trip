var mongoose = require('mongoose'),
    usermodel = require('../models/index.js').user;


module.exports = {
    find: function (query, callback) {
        debugger;
        if (callback == null) {
            callback = query;
            query = null;
        }
        usermodel.find(query, function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(null, response)
            }
        })
    },
    save: function (user, callback) {
        var userobject = new usermodel(user);
        userobject.save(function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(null, response)
            }
        })
    }
}