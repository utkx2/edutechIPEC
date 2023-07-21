const mongoose = require('mongoose');
const validator = require("validator");
const { sentenceCase } = require('../config/functions');

const UserModel = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: { unique: true }
        },
        firstName: {
            type: String,
            required: true,
            set: sentenceCase
        },
        middleName: {
            type: String,
            set: sentenceCase
        },
        lastName: {
            type: String,
            required: true,
            set: sentenceCase
        },
        email: {
            type: String,
            required: [true, "Please enter your email."],
            index: { unique: true },
            validate: validator.isEmail
        },
        password: {
            type: String,
            required: [true, "Please enter your password."],
            minlength: [6, "Password must be at least 6 characters"],
        },
        userRole: {
            type: String,
            enum: ["admin", "student"],
            default: "student"
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
            required: true
        },
        fatherName: {
            type: String,
            required: true,
            set: sentenceCase
        },
        fatherMobNo: {
            type: Number,
            required: true
        },
        motherName: {
            type: String,
            required: true,
            set: sentenceCase
        },
        motherMobNo: {
            type: Number,
        },
        category: {
            type: String,
            required: true,
            set: (value) => value.toUpperCase(),
        },
        address: {
            type: String,
            required: true,
            set: (value) => {
                if (typeof value !== 'string' || value.length === 0) return value;

                return value
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            },
        },
        state: {
            type: String,
            required: true,
            set: sentenceCase
        },
        city: {
            type: String,
            required: true,
            set: sentenceCase
        },
        pinCode: {
            type: Number,
            required: true
        },
        schoolName: {
            type: String,
            required: true,
            set: sentenceCase
        },
        grade: {
            type: String,
            required: false
        },
        schoolCity: {
            type: String,
            required: true,
            set: sentenceCase
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('users', UserModel);