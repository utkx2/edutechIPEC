const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const pdf = require('../models/FileHandlingModel');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Upload PDF
exports.uploadPdf = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file received' });
        }

        const newPdf = new pdf({
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
        });

        newPdf.save()
            .then(() => {
                res.json({ message: 'File uploaded successfully' });
            })
            .catch((error) => {
                console.error('Error saving PDF:', error);
                res.status(500).json({ error: 'An error occurred while saving the PDF' });
            });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'An error occurred while uploading the file' });
    }
};

// Download PDF
exports.downloadPdf = (req, res) => {
    const pdfId = req.params.id;

    pdf.findById(pdfId)
        .then((pdf) => {
            if (!pdf) {
                return res.status(404).json({ error: 'PDF not found' });
            }

            res.download(pdf.path, pdf.originalname);
        })
        .catch((error) => {
            console.error('Error downloading PDF:', error);
            res.status(500).json({ error: 'An error occurred while downloading the PDF' });
        });
};

// Delete PDF
exports.deletePdf = (req, res) => {
    const pdfId = req.params.id;

    pdf.findByIdAndDelete(pdfId)
        .then((pdf) => {
            if (!pdf) {
                return res.status(404).json({ error: 'PDF not found' });
            }

            res.json({ message: 'PDF deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting PDF:', error);
            res.status(500).json({ error: 'An error occurred while deleting the PDF' });
        });
};
