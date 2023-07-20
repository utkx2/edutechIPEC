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


// {
//     "images": [
//         "https://example.com/image1.jpg",
//         "https://example.com/image2.jpg",
//         "https://example.com/image3.jpg"
//     ]
// }