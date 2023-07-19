const express = require('express');
const router = express.Router();
const StudentCards = require('../models/StudentHomePageModel');


// http://localhost:3000/api/studentHomePage/get
router.get('/get', async (req, res) => {
    try {
        const studentHomePageCards = await StudentCards.find();
        res.json(studentHomePageCards);
    }
    catch (error) {
        console.error('error fetching the student cards', error);
        return res.status(500).json(error);
    }
});


// http://localhost:3000/api/studentHomePage/upload
router.post('/upload', async (req, res) => {
    try {
        const {
            description, air,
            studentImg, studentDetails, exam
        } = req.body;
        const newStudentCard = new StudentCards({
            description, air, studentImg, studentDetails, exam
        });
        await newStudentCard.save();

        res.json({ message: 'student card added successfully', card: newStudentCard });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/studentHomePage/edit/:id
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            description,
            air,
            studentImg,
            studentDetails,
            exam
        } = req.body;
        const updatedCard = await StudentCards.findByIdAndUpdate(
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

// http://localhost:3000/api/studentHomePage/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await StudentCards.findByIdAndRemove(id);
        res.json({ message: 'the card has been removed successfully' });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

module.exports = router;


// {
//     "description": "This is the description.",
//         "air": 123,
//             "studentImg": "https://example.com/student-img.jpg",
//                 "studentDetails": {
//         "name": "John Doe",
//             "classRoomDetails": "Class A",
//                 "enrollmentNo": "12345"
//     },
//     "exam": "English"
// }
