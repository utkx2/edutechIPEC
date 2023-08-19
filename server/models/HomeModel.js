const mongoose = require('mongoose');
const { Schema } = mongoose;

const HomeModel = new Schema({
    carousel: [{
        type: String,
        required: true
    }],
    faculty: {
        images: [{
            type: String,
            required: true
        }],
        description: [{
            type: String,
            required: true
        }]
    },
    selectedStudents: {
        images: [{
            type: String,
            required: true
        }],
        description: [{
            type: String,
            // required: true
        }],
        air: [{
            type: Number,
            required: true
        }],
        exam: [{
            type: String,
            required: true
        }]
    },
    programs: [{
        images: [{
            type: String,
            required: true
        }],
        description: [{
            type: String,
            required: true
        }]
    }]
});

module.exports = mongoose.model('Home', HomeModel);