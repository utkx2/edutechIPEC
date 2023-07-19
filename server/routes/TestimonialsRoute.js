const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // Import the path module

const testimonialsModel = require('../models/TestimonialsModel');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Upload Intro Video and Testimonial Card
// http://localhost:3000/api/testimonials/upload

router.post('/upload', async (req, res) => {
    try {
        const { introVideoUrl, cards } = req.body;
        const testimonial = new testimonialsModel({
            introVideoUrl,
            cards,
        });
        await testimonial.save();
        res.json({ message: 'Video and card uploaded successfully', introVideoUrl, cards });
    }
    catch (error) {
        console.error('Error uploading video and card:', error);
        res.status(500).json({ error: 'An error occurred while uploading video and card' });
    }
});

// http://localhost:3000/api/testimonials/edit

router.put('/edit', async (req, res) => {
    try {
        const { introVideoUrl, cards } = req.body;
        const testimonial = await testimonialsModel.findOneAndUpdate({
            introVideoUrl,
            cards,
        });
        await testimonial.save();
        res.json({ message: 'Video and card updated successfully', testimonial });
    }
    catch (error) {
        console.error('Error uploading video and card:', error);
        res.status(500).json({ error: 'An error occurred while uploading video and card' });
    }
});

// Get Testimonials
// http://localhost:3000/api/testimonials/get

router.get('/get', async (req, res) => {
    try {
        const testimonial = await testimonialsModel.findOne({});
        res.json(testimonial || {});
    } catch (error) {
        console.error('Error getting testimonials:', error);
        res.status(500).json({ error: 'An error occurred while getting testimonials' });
    }
});

module.exports = router;


// sample json object
// {
//     "introVideoUrl": "https://example.com/intro-video",
//         "cards": [
//             {
//                 "title": "Card 1",
//                 "content": "jai ho bhai",
//                 "imageUrl": "https://example.com/card1-image.jpg",
//                 "examName": "Exam A"
//             },
//             {
//                 "title": "Card 2",
//                 "content": "padhai kr lo bro ",
//                 "imageUrl": "https://example.com/card2-image.jpg",
//                 "examName": "Exam B"
//             }
//         ]
// }
