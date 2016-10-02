var mongoose = require('mongoose'),
    chatmodel = require('../models/index.js').chat;


module.exports = {
    find: function (query, callback) {
        if (callback == null) {
            callback = query;
            query = null;
        }
        chatmodel.find(query, function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(null, response)
            }
        })
    },
    save: function (chat, callback) {
        debugger;
        var chatbject = new chatmodel(chat);
        chatbject.save(function (error, response) {
            if (error) {
                callback(error)
            } else {
                callback(null, response)
            }
        })
    }
}