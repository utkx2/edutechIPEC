const mongoose = require('mongoose');

const OfflineResultsSchema = new mongoose.Schema({
    students: [{
        email: {
            type: String,
            required: true
        },
        examScore: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('OfflineResults', OfflineResultsSchema);