const mongoose = require('mongoose');
const {Schema} = mongoose;

const ContentModel = new Schema({
    whyIPEC: {
        description: {
            type: String,
        },
        subTexts: {
            type: [String],
        },
    },
    AboutIPEC: {
        ipecAbout: {
            type: String,
        },
        ipecAdvantages: {
            type: [{
                title: String,
                description: String,
            }],
        },
        ipecPedagogy: {
            type: [{
                title: String,
                description: String
            }],
        }
    },
});

module.exports = mongoose.model('content', ContentModel);