const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    selectedService: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        timestamps: true
    }
});

module.exports = mongoose.model('contact', ContactModel);