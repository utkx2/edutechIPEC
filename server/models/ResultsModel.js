const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    centreName: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    IPECRollNo: {
        type: String,
        required: true,
    },
    CRLRank: {
        type: Number,
        required: true,
    },
});

const resultSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true,
    },
    students: {
        type: [studentSchema],
        required: true,
    },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
