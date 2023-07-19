// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const FacultyHomePage = new Schema({
//     collegeName: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     facultyImg: {
//         type: String,
//         required: true
//     },
//     classroom: {
//         type: String,
//     },
//     experience: {
//         type: String,
//         required: true
//     }
// });

const mongoose = require('mongoose');

const teacherDetailsSchema = new mongoose.Schema({
    collegeName: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    classroom: { type: String },
    experience: { type: String, required: true }
});

const schema = new mongoose.Schema({
    teacherDetails: [teacherDetailsSchema]
});

const FacultyCards = mongoose.model('FacultyCards1', schema);

module.exports = FacultyCards;


// FacultyCards = mongoose.model('FacultyCards', FacultyHomePage);
// module.exports = FacultyCards;