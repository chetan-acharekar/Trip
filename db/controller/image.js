var mongoose = require('mongoose'),
    imagemodel = require('../models/index.js').image;


module.exports = {
    distinct: function (field, callback) {
        imagemodel.distinct(field, function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(null, response)
            }
        })
    },
    find: function (query, callback) {
        if (callback == null) {
            callback = query;
            query = null;
        }
        imagemodel.find(query, function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(null, response)
            }
        })
    },
    save: function (images, callback) {
        imagemodel.collection.insert(images, function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(null, response)
            }
        })
    }
}