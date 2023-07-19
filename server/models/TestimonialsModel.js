const mongoose = require('mongoose');
const { Schema } = mongoose;

const testimonialSchema = new Schema({
    introVideoUrl: {
        type: String,
        required: true,
    },
    cards: [
        {
            title: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
            examName: {
                type: String,
            }
        },
    ],
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
