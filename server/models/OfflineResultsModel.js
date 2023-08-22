const mongoose = require('mongoose');

const OfflineResultsSchema = new mongoose.Schema({
    students: [{
        email: {
            type: String,
            required: true
        },
        examScore: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('OfflineResults', OfflineResultsSchema);