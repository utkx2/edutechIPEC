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
router.post('/testimonials', 
    upload.fields([{ name: 'introVideo', maxCount: 1 }, 
    { name: 'cardImage', maxCount: 1 }]), 
async (req, res) => {
    try {
        if (!req.files || !req.files.introVideo || !req.files.cardImage) {
            return res.status(400).json({ error: 'Both intro video and card image are required' });
        }

        // Save the intro video URL to the database
        const introVideoUrl = req.files.introVideo[0].path;

        // Save the card details to the database
        const { title, content } = req.body;
        const imageUrl = req.files.cardImage[0].path;

        const card = { title, content, imageUrl };

        let testimonial = await testimonialsModel.findOne({});

        if (!testimonial) {
            // If no testimonial exists, create a new one
            testimonial = new testimonialsModel({
                introVideoUrl,
                cards: [card],
            });
        } else {
            // If testimonial exists, add the new card to the existing one
            testimonial.cards.push(card);
        }

        await testimonial.save();

        res.json({ message: 'Video and card uploaded successfully', introVideoUrl, card });
    }
    catch (error) {
        console.error('Error uploading video and card:', error);
        res.status(500).json({ error: 'An error occurred while uploading video and card' });
    }
});

// Get Testimonials
router.get('/testimonials', async (req, res) => {
    try {
        const testimonial = await testimonialsModel.findOne({});
        res.json(testimonial || {});
    } catch (error) {
        console.error('Error getting testimonials:', error);
        res.status(500).json({ error: 'An error occurred while getting testimonials' });
    }
});

module.exports = router;
