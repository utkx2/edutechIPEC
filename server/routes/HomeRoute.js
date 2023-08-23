const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Home = require('../models/HomeModel');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/home/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Upload home page content
// http://localhost:3000/api/home/upload
router.post('/home/upload', isAdmin, upload.fields([
    { name: 'carousel', maxCount: 4 },
    { name: 'faculty.images', maxCount: 4 },
    { name: 'selectedStudents.images', maxCount: 4 },
    { name: 'programs.*.images', maxCount: 4 },
]), async (req, res) => {
    try {
        const { carousel, faculty, selectedStudents, programs } = req.files;
        const {
            facultyDescription,
            selectedStudentsDescription,
            selectedStudentsAIR,
            selectedStudentsExam,
            programDescription
        } = req.body;

        const homeContent = new Home({
            carousel: carousel.map(file => file.filename),
            faculty: {
                images: faculty.map(file => file.filename),
                description: facultyDescription,
            },
            selectedStudents: {
                images: selectedStudents.map(file => file.filename),
                description: selectedStudentsDescription,
                air: selectedStudentsAIR,
                exam: selectedStudentsExam,
            },
            programs: programs.map((program, index) => ({
                images: program.images.map(file => file.filename),
                description: programDescription[index],
            })),
        });

        await homeContent.save();

        res.json({ message: 'Home page content uploaded successfully', homeContent });
    } catch (error) {
        console.error('Error uploading home page content:', error);
        res.status(500).json({ error: 'An error occurred while uploading home page content' });
    }
});

// Fetch home page content
// http://localhost:3000/api/home/content
router.get('/home/content', async (req, res) => {
    try {
        const homeContent = await Home.findOne({}); // Assuming there's only one document for the home page content
        res.json(homeContent);
    } catch (error) {
        console.error('Error fetching home page content:', error);
        res.status(500).json({ error: 'An error occurred while fetching home page content' });
    }
});

module.exports = router;
