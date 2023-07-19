const express = require('express');
const router = express.Router();
const StudentModel = require('../models/StudentHomePageModel');

router.get('/studentHomePage', async (req, res) => {
    try {
        const studentHomePageCards = await StudentModel.find();
        res.json(studentHomePageCards);
    }
    catch (error) {
        console.error('error fetching the student cards', error);
        return res.status(500).json(error);
    }
});

router.post('/studentHomePage', async (req, res) => {
    try {
        const {
            description,
            air,
            studentImg,
            studentDetails,
            exam
        } = req.body;
        const newStudentCard = new StudentModel({
            description,
            air,
            studentImg,
            studentDetails,
            exam
        });
        await newStudentCard.save();

        res.json({ message: 'student card added successfully', card: newStudentCard });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

router.put('/studentHomepage/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            description, 
            air, 
            studentImg, 
            studentDetails, 
            exam 
        } = req.body;
        const updatedCard = await StudentHomePage.findByIdAndUpdate(
            id,
            { description, air, studentImg, studentDetails, exam },
            { new: true } // This option returns the updated document
        );
        res.json({ message: 'Student home page card updated successfully', card: updatedCard });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

router.delete('/studentHomePage/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await StudentModel.findByIdAndRemove(id);
        res.json({message: 'the card has been removed successfully'});
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

module.exports = router;