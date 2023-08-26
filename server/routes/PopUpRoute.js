const express = require('express');
const router = express.Router();
const PopUp = require('../models/PopUpModel');
const { isAdmin, verifyToken, isNotUser } = require("../middleware/auth")
const XLSX = require('xlsx');
require('dotenv').config();

const multer = require('multer');
const upload = multer();

// http://localhost:3000/api/PopUp/postImage
router.post("/postImage", isAdmin, async (req, res) => {
    try {
        const { image, redirectURL } = req.body;
        const ImageLinks = await PopUp.findOneAndUpdate({}, { image, redirectURL }, { new: true, upsert: true });
        res.status(200).json(ImageLinks);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
})

// http://localhost:3000/api/PopUp/getImage
router.get('/getImage', async (req, res) => {
    try {
        const Image = await PopUp.find();
        res.status(200).json(Image);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;