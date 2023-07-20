const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarouselHomePage = new Schema({
    images: {
        type: [String],
        required: true
    },

});

Carousel = mongoose.model('Carousel', CarouselHomePage);
module.exports = Carousel;

