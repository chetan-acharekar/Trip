var mongoose = require('mongoose'),
    chatchema = mongoose.Schema({
        'message': String,
        'creator': String,
        'createdOn': Date,
        'tripID': String
    });

module.exports = mongoose.model('TblChat', chatchema);