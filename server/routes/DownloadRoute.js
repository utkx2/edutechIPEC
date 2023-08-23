const express = require('express');
const router = express.Router();
const SamplePaper = require('../models/SamplePaperModel');
const syllabus = require('../models/SyllabusModel');
const Brochure = require('../models/BrochureModel');
const { verifyToken, isAdmin } = require('../middleware/auth');
const fsExtra = require('fs-extra');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });


// http://localhost:3000/api/download/delete-pdf-files
router.delete('/delete-pdf-files', isAdmin, (req, res) => {
    const folderPath = '../server/uploads'; // Specify the path to the folder

    fsExtra.readdir(folderPath, (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred while reading the folder');
            return;
        }

        files.forEach(file => {
            if (file.endsWith('.pdf')) {
                fsExtra.remove(path.join(folderPath, file))
                    .then(() => {
                        console.log(`${file} deleted successfully`);
                    })
                    .catch(err => {
                        console.error(`Failed to delete ${file}: ${err}`);
                    });
            }
        });

        res.send('PDF files deleted successfully');
    });
});


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

// http://localhost:3000/api/download/pdf/upload
router.post('/pdf/upload', isAdmin, upload.single('pdfFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file received' });
        }
        console.log(req.file);
        res.send({ filenames: `/uploads/${req.file.filename}` });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});


// http://localhost:3000/api/download/samplePaper/upload
router.post('/samplePaper/upload', isAdmin, async (req, res) => {
    try {

        const {
            className, fileLink
        } = req.body;
        const newSamplePaper = new SamplePaper({
            className, fileLink
        });
        await newSamplePaper.save();
        res.json({ message: 'SamplePaper Pdf added successfully' });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/download/samplePaper/edit/:id
router.put('/samplePaper/edit/', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const {
            className, fileLink
        } = req.body;
        // console.log(className);
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
router.delete('/samplePaper/delete/:id', isAdmin, async (req, res) => {
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
router.post('/syllabus/upload', isAdmin, async (req, res) => {
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
router.put('/syllabus/edit/', isAdmin, async (req, res) => {
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
router.delete('syllabus/delete/:id', isAdmin, async (req, res) => {
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
router.post('/brochure/upload', isAdmin, async (req, res) => {
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
router.put('/brochure/edit/', isAdmin, async (req, res) => {
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
router.delete('/brochure/delete/:id', isAdmin, async (req, res) => {
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