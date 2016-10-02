var mongoose = require('mongoose'),
    tripchema = mongoose.Schema({
        'title': String,
        'createdBy': String,
        'createdOn': Date,
        'participants': Array,
        'description': String
    });

module.exports = mongoose.model('TblTrip', tripchema);