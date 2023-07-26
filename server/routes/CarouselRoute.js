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
        // console.log(req.body);
        const newData = {
            images: req.body
        }
        //  console.log(newData);
        const options = { upsert: true, new: true };
        const updatedData = await Carousel.findOneAndUpdate({}, newData, options);
        //   console.log(updatedData);
        // return res.status(200).json({ message: 'Data saved successfully', data: updatedData });

        return res.status(200).json({ message: 'carousel saved successfully', carouselLinks: updatedData });
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

