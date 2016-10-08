var mongoose = require('mongoose'),
    tripchema = mongoose.Schema({
        'title': String,
        'createdBy': String,
        'createdOn': Date,
        'updatedBy': String,
        'lastUpdatedon': Date,
        'participants': Array,
        'description': String,
        'image': String
    });

module.exports = mongoose.model('TblTrip', tripchema);