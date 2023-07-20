const mongoose = require('mongoose');
const { Schema } = mongoose;

const BrochureModel = new Schema({
    examName: {
        type: String,
        required: true
    },
    fileLink: {
        type: [String],
        required: [true, "please enter file Link"]
    }

});

Brochure = mongoose.model('Brochure', BrochureModel);
module.exports = Brochure;

