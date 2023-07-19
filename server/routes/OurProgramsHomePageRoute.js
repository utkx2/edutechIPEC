const express = require('express');
const router = express.Router();

const OurProgramsModel = require('../models/OurProgramsHomePageModel');

router.get('/ourPrograms', async (req, res) => {
    try {
        const ourprograms = OurProgramsModel.find();
        res.json(ourprograms);
    }
    catch (error) {
        console.error('error occoured', error);
        return res.status(500).json(error);
    }
});

router.post('/ourPrograms', async (req, res) => {
    try {
        const { title, description } = req.body;
        const OurProgramsCard = new OurProgramsModel({
            title, description
        });
        await OurProgramsCard.save();

        res.json({ message: 'card created' });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

module.exports = router;