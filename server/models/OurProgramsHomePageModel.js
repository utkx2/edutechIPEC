const mongoose = require('mongoose');
const { Schema } = mongoose;

const OurProgramsHomePageModel = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const ourPrograms = mongoose.model('OurPrograms', OurProgramsHomePageModel);
module.exports = ourPrograms;