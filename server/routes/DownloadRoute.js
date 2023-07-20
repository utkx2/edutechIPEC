const express = require('express');
const router = express.Router();
const SamplePaper = require('../models/SamplePaperModel');
const syllabus = require('../models/SyllabusModel');


// http://localhost:3000/api/download/samplePaper/get
router.get('/samplePaper/get', async (req, res) => {
    try {
        const SamplePaperObject = await SamplePaper.find();
        res.json(SamplePaperObject);
    }
    catch (error) {
        console.error('error fetching the samplePapers', error);
        return res.status(500).json(error);
    }
});


// http://localhost:3000/api/download/samplePaper/upload
router.post('/samplePaper/upload', async (req, res) => {
    try {
        const {
            className, fileLink
        } = req.body;
        const newSamplePaper = new SamplePaper({
            className, fileLink
        });
        await newSamplePaper.save();

        res.json({ message: 'SamplePaper added successfully', SamplePaper: newSamplePaper });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/download/samplePaper/edit/:id
router.put('/samplePaper/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            className, fileLink
        } = req.body;
        const updatedCarousel = await SamplePaper.findByIdAndUpdate(
            id,
            {
                className, fileLink
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

// http://localhost:3000/api/download/samplePaper/delete/:id
router.delete('/samplePaper/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await SamplePaper.findByIdAndRemove(id);
        res.json({ message: 'the carousel has been removed successfully' });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});




// http://localhost:3000/api/download/syllabus/get
router.get('/syllabus/get', async (req, res) => {
    try {
        const SamplePaperObject = await SamplePaper.find();
        res.json(SamplePaperObject);
    }
    catch (error) {
        console.error('error fetching the samplePapers', error);
        return res.status(500).json(error);
    }
});


// http://localhost:3000/api/download/syllabus/upload
router.post('/syllabus/upload', async (req, res) => {
    try {
        const {
            className, fileLink
        } = req.body;
        const newsyllabus = new syllabus({
            className, fileLink
        });
        await newsyllabus.save();

        res.json({ message: 'syllabus added successfully', syllabus: newsyllabus });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/download/syllabus/edit/:id
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            className, fileLink
        } = req.body;
        const updatedCarousel = await syllabus.findByIdAndUpdate(
            id,
            {
                className, fileLink
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

// http://localhost:3000/api/download/syllabus/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await syllabus.findByIdAndRemove(id);
        res.json({ message: 'the carousel has been removed successfully' });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});


module.exports = router;


// {
//     "images": [
//         "https://example.com/image1.jpg",
//         "https://example.com/image2.jpg",
//         "https://example.com/image3.jpg"
//     ]
// }