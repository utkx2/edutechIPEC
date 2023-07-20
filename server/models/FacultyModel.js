const mongoose = require('mongoose');
const { Schema } = mongoose;

const FacultyHomePage = new Schema({
    collegeName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    facultyImg: {
        type: String,
        required: true
    },
    classroom: {
        type: String,
    },
    experience: {
        type: String,
        required: true
    }
});

FacultyCards = mongoose.model('FacultyCards', FacultyHomePage);
module.exports = FacultyCards;