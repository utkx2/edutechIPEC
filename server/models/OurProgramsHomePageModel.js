const mongoose = require('mongoose');
const { Schema } = mongoose;

const OurProgramsHomePageSchema = new mongoose.Schema({
    programs: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
});



const ourPrograms = mongoose.model('OurProgramsNew', OurProgramsHomePageSchema);
module.exports = ourPrograms;