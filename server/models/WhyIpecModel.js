const mongoose = require('mongoose');
const { Schema } = mongoose;

const whyIPEC_Model = new Schema({

    Title: {
        type: String,
    },
    Content: {
        type: String,
    },
    Reasons: {
        type: [String],
    }
},
);

const whyIPEC = mongoose.model('why', whyIPEC_Model);

module.exports = whyIPEC;