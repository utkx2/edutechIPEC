const mongoose = require('mongoose');
const { Schema } = mongoose;

const SamplePaperModel = new Schema({
    className: {
        type: Number,
        required: true
    },
    fileLink: {
        type: [String],
        required: [true, "please enter file Link"]
    }

});

SamplePaper = mongoose.model('SamplePaper', SamplePaperModel);
module.exports = SamplePaper;

