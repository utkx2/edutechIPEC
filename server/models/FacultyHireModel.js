const mongoose = require('mongoose');
const validator = require("validator");
const { Schema } = mongoose;

const FacultyHireModel = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: { unique: true },
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    previousExperience: {
        type: String,
        required: true
    },
    category: {
        type: String,
        // enum: ['general', 'ews', 'sc', 'st', 'obc', 'disability'],
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
    },
    addressLine3: {
        type: String,
    },
    state: {
        type: String,
        // enum: ['Maharashtra', 'Karnataka', 'Tamil Nadu'],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    message: {
        type: String,
    }
});

const FacultyHire = mongoose.model('FacultyHire', FacultyHireModel);

module.exports = FacultyHire;