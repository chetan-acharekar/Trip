var mongoose = require('mongoose'),
    userschema = mongoose.Schema({
        'firstname': String,
        'lastname': String,
        'mail': String,
        'IsAdmin': Boolean,
        'password': String,
        'username': {
            type: String,
            unique: true
        }
    });

module.exports = mongoose.model('TblUser', userschema);