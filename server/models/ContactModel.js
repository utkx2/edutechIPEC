const mongoose = require('mongoose');
const userModel = require("./UserModel");
const { Schema } = mongoose;

const ContactModel = new Schema({
    userId: {
        type: String,
        ref: userModel
    },
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
    createdAt: {
        type: Date,
        default: Date.now,
        timestamps: true
    }
});

const Contact = mongoose.model('contact', ContactModel);
module.exports = Contact;
