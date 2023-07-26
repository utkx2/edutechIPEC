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

const FacultiesSchema = new mongoose.Schema({
    facultyMembers: [FacultyHomePage], // Array of faculty objects using the FacultySchema
});

const FacultiesModel = mongoose.model('Faculties', FacultiesSchema);

module.exports = FacultiesModel;
