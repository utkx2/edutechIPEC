const mongoose = require('mongoose');
const { Schema } = mongoose;

const syllabusModel = new Schema({
    className: {
        type: String,
        required: true
    },
    fileLink: {
        type: [String],
        required: [true, "please enter file Link"]
    }

});

syllabus = mongoose.model('Syllabus', syllabusModel);
module.exports = syllabus;

