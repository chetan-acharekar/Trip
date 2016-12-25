var mongoose = require('mongoose'),
    logSchema = mongoose.Schema({
        'siteVisitCount': Number
    });

module.exports = mongoose.model('TblLog', logSchema);