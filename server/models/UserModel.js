const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserModel = new Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    confirm_email: {
        type: String,
        required: true
    },
    mobileNumber: {
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
    fatherMob: {
        type: Number,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    motherMob: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['general', 'sc', 'st', 'obc'],
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
    state: {
        type: String,
        enum: ['Maharashtra', 'Karnataka', 'Tamil Nadu'],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    schoolName: {
        type: String,
        required: true
    },
    schoolCity: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('user', UserModel);