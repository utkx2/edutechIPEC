const express = require('express');
const router = express.Router();
const OfflineResults = require('../models/OfflineResultsModel');
const { isAdmin, verifyToken, isNotUser } = require("../middleware/auth")
const XLSX = require('xlsx');
require('dotenv').config();

const multer = require('multer');
const upload = multer();


// http://localhost:3000/api/OfflineResults/postResult
router.post('/postResult', upload.single('excelFile'), async (req, res) => {
    try {
        const { buffer } = req.file;
        // console.log(req.file);
        //  console.log('Buffer Data:', buffer);
        const workbook = XLSX.read(buffer); // Parse the file buffer
        const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
        const sheet = workbook.Sheets[sheetName];
        const usersArray = XLSX.utils.sheet_to_json(sheet);
        //    console.log(usersArray);
        // console.log(req.body.students);
        const Results = await OfflineResults.findOneAndUpdate({}, { students: usersArray }, { new: true, upsert: true });
        res.status(200).json(Results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// http://localhost:3000/api/OfflineResults/getResult
router.get('/getResult/:email', async (req, res) => {
    try {
        // const Results = await OfflineResults.find();
        // res.status(200).json(Results);
        const email = req.params.email;

        const result = await OfflineResults.findOne(
            { 'students.email': email },
            { 'students.$': 1 }
        );
        if (!result) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const examScore = result.students[0].examScore;
        res.json({ email, examScore });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
