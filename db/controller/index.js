var mongoose = require('mongoose'),
    config = require('../../config.js');


mongoose.connect(config.mongouri);

module.exports = {
    user: require('./user.js'),
    trip: require('./trip.js'),
    chat: require('./chat.js')
}