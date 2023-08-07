const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuickLinks = new Schema({
    tittle: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    number: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    }
});

const QuickLinksSchema = new mongoose.Schema({
    quickLinks: [QuickLinks], // Array of faculty objects using the FacultySchema
});

const QuickLinksModel = mongoose.model('quickLinks', QuickLinksSchema);

module.exports = QuickLinksModel;
