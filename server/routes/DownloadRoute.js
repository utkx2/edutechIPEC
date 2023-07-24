const express = require('express');
const router = express.Router();
const SamplePaper = require('../models/SamplePaperModel');
const syllabus = require('../models/SyllabusModel');
const Brochure = require('../models/BrochureModel');


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
router.put('/samplePaper/edit/', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            className, fileLink
        } = req.body;
        console.log(className);
        const updatedCarousel = await SamplePaper.findOneAndUpdate(
            { className }, {
            fileLink
        },
            {
                new: true,
                upsert: true
            } // This option returns the updated document
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
        const syllabusData = await syllabus.find();
        res.json(syllabusData);
    }
    catch (error) {
        console.error('error fetching the syllabus', error);
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

// http://localhost:3000/api/download/syllabus/edit
router.put('/syllabus/edit/', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            className, fileLink
        } = req.body;
        const updatedSyllabus = await syllabus.findOneAndUpdate(
            { className }, {
            fileLink
        },
            { new: true, upsert: true } // This option returns the updated document
        );
        res.json({ message: 'syllabus link updated successfully', syllabus: updatedSyllabus });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/download/syllabus/delete/:id
router.delete('syllabus/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await syllabus.findByIdAndRemove(id);
        res.json({ message: 'the syllabus has been removed successfully' });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

//     API For Brochure


// http://localhost:3000/api/download/brochure/get
router.get('/brochure/get', async (req, res) => {
    try {
        const BrochureData = await Brochure.find();
        res.status(200).json(BrochureData);
    }
    catch (error) {
        console.error('error fetching the Brochure', error);
        return res.status(500).json(error);
    }
});


// http://localhost:3000/api/download/brochure/upload
router.post('/brochure/upload', async (req, res) => {
    try {
        const {
            examName, fileLink
        } = req.body;
        const newBrochure = new Brochure({
            examName, fileLink
        });
        await newBrochure.save();

        res.json({ message: 'Brochure added successfully', Brochure: newBrochure });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/download/brochure/edit/
router.put('/brochure/edit/', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            examName, fileLink
        } = req.body;
        const updatedBrochure = await Brochure.findOneAndUpdate({ examName },
            {
                fileLink
            },
            { new: true, upsert: true } // This option returns the updated document
        );
        res.json({ message: 'Brochure home page card updated successfully', Brochure: updatedBrochure });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/download/brochure/delete/:id
router.delete('/brochure/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Brochure.findByIdAndRemove(id);
        res.json({ message: 'the Brochure has been removed successfully' });
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