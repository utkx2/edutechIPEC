const express = require('express');
const router = express.Router();
const Carousel = require('../models/CarouselModel');


// http://localhost:3000/api/carousel/get
router.get('/get', async (req, res) => {
    try {
        const CarouselsObject = await Carousel.find();
        res.json(CarouselsObject);
    }
    catch (error) {
        console.error('error fetching the  carousels', error);
        return res.status(500).json(error);
    }
});


// http://localhost:3000/api/carousel/upload
router.post('/upload', async (req, res) => {
    try {
        const {
            images
        } = req.body;
        const newCarousels = new Carousel({
            images
        });
        await newCarousels.save();

        res.json({ message: 'carousel added successfully', carouselLinks: newCarousels });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/carousel/edit/:id
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            images
        } = req.body;
        const updatedCarousel = await Carousel.findByIdAndUpdate(
            id,
            {
                images
            },
            { new: true } // This option returns the updated document
        );
        res.json({ message: 'carousel home page card updated successfully', CarouselLinks: updatedCarousel });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/carousel/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Carousel.findByIdAndRemove(id);
        res.json({ message: 'the carousel has been removed successfully' });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

module.exports = router;

// {
//     "collegeName": "IIT Bombay",
//         "name": "John Doe",
//             "facultyImg": "https://example.com/faculty-img.jpg",
//                 "classroom": "Room A",
//                     "experience": "10 years"
// }
