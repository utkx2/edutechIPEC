const mongoose = require('mongoose');
const { Schema } = mongoose;

const AboutModel = new Schema({

    AboutIPEC: {
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
);

const About = mongoose.model('About', AboutModel);

module.exports = About;