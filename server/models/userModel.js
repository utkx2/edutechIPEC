const mongoose = require('mongoose');
const validator = require("validator");
const { sentenceCase } = require('../config/functions');

const UserModel = new mongoose.Schema(
    {
        name: {
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
        }
    },
    { timestamps: true }
);

const User = mongoose.model('Users', UserModel);

module.exports =  User;