const mongoose = require('mongoose');
const { sentenceCase } = require('../config/functions');
const { Schema } = mongoose;

const AboutModel = new Schema(
    {
        AboutIPEC: {
            type: String,
            set: sentenceCase
        },
        ipecAdvantages: {
            type: [{
                title: {type: String, set:sentenceCase},
                description: {type: String, set:sentenceCase},
            }],
        },
        ipecPedagogy: {
            type: [{
                title: {type: String, set:sentenceCase},
                description: {type: String, set:sentenceCase},
            }],
        }
    },
    { timestamps: true }
);

const About = mongoose.model('about', AboutModel);

module.exports = About;