const express = require('express');
const router = express.Router();
const ourPrograms = require('../models/OurProgramsHomePageModel');

//  http://localhost:3000/api/ourPrograms/get/
router.get('/get', async (req, res) => {

    try {
        const ourprogramsObj = await ourPrograms.find();
        console.log(ourprogramsObj);
        res.json(ourprogramsObj);
    }
    catch (error) {
        console.error('error occoured', error);
        return res.status(500).json(error);
    }
});

//  http://localhost:3000/api/ourPrograms/upload/
router.post('/upload', async (req, res) => {
    try {
        // const { title, description } = req.body;
        // const OurProgramsCard = new ourPrograms({
        //     title, description
        // });
        // await OurProgramsCard.save();
        // console.log(req.body);

        const programData = req.body; // JSON object with program information
        // console.log(programData);
        const update = { programs: programData };
        console.log(update);
        // Use findOneAndUpdate without filter (it will find the only entry in the collection)
        const updatedPrograms = await ourPrograms.findOneAndUpdate({}, update, {
            new: true,
            upsert: true,
        });
        //  console.log(updatedPrograms);
        res.json({ message: 'Our Programs added successfully', programs: updatedPrograms });


        // res.json({ message: 'card created' });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});


//  http://localhost:3000/api/ourPrograms/edit/
router.put('/edit/:id', async (req, res) => {
    const cardId = req.params.id;
    try {
        const { title, description } = req.body;

        const updatedCard = await ourPrograms.findByIdAndUpdate(
            cardId,
            { title, description },
            { new: true }
        );

        res.json({ message: 'Card updated', updatedCard });
    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const cardId = req.params.id;
    try {
        const deletedCard = await OurProgramsCard.findByIdAndDelete(cardId);

        if (!deletedCard) {
            return res.status(404).json({ error: 'Card not found' });
        }

        res.json({ message: 'Card deleted successfully', deletedCard });
    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;