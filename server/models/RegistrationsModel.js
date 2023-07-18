const mongoose = require('mongoose');
const validator = require("validator");
const { Schema } = mongoose;

const RegistrationsModel = new Schema({

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
    fatherName: {
        type: String,
        required: true
    },
    fatherNumber: {
        type: Number,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    motherNumber: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['general', 'ews', 'sc', 'st', 'obc'],
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: true
    },
    addressLine3: {
        type: String,
        required: true
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
    zipCode: {
        type: Number,
        required: true
    },

    message: {
        type: String,
    }
});

module.exports = mongoose.model('Registrations', RegistrationsModel);