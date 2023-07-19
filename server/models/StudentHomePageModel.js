const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentHomePage = new Schema({
    description: {
        type: String,
        required: true
    },
    air: {
        type: Number,
        required: true
    },
    studentImg: {
        type: String,
        required: true
    },
    StudentDetails: {
        type: String,
        required: true
    },
    exam: {
        type: String,
        required: true
    }
});

exports.modules = mongoose.model('StudentCards', StudentHomePage);