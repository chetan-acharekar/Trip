var mongoose = require('mongoose'),
    tripchema = mongoose.Schema({
        'title': String,
        'createdBy': String,
        'createdOn': Date,
        'updatedBy': String,
        'lastUpdatedon': Date,
        'participants': Array,
        'intro': String,
        'description': String,
        'image': String,
        'type': String,
        'date':Date,
        'slug':String
    });

module.exports = mongoose.model('TblTrip', tripchema);