const express = require('express');
const router = express.Router();
const FacultyCards = require('../models/FacultyModel');


// http://localhost:3000/api/facultyHomePage/get
router.get('/get', async (req, res) => {
    try {
        const facultyHomePageCards = await FacultyCards.find();
        res.json(facultyHomePageCards);
    }
    catch (error) {
        console.error('error fetching the student cards', error);
        return res.status(500).json(error);
    }
});


// http://localhost:3000/api/facultyHomePage/upload
router.post('/upload', async (req, res) => {
    try {
        const { teacherDetails
        } = req.body;
        const newFacultyCard = new FacultyCards({
            // collegeName, name,
            // facultyImg, classroom, experience
            teacherDetails
        });
        await newFacultyCard.save();

        res.json({ message: 'faculty card added successfully', card: newFacultyCard });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/facultyHomePage/edit/:id
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            collegeName, name,
            facultyImg, classroom, experience
        } = req.body;
        const updatedCard = await FacultyCards.findByIdAndUpdate(
            id,
            {
                collegeName, name,
                facultyImg, classroom, experience
            },
            { new: true } // This option returns the updated document
        );
        res.json({ message: 'faculty home page card updated successfully', card: updatedCard });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/facultyHomePage/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await FacultyCards.findByIdAndRemove(id);
        res.json({ message: 'the card has been removed successfully' });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

module.exports = router;

// {
//     "collegeName": "IIT Bombay",
//         "name": "John Doe",
//             "facultyImg": "https://example.com/faculty-img.jpg",
//                 "classroom": "Room A",
//                     "experience": "10 years"
// }


// {
//     "teacherDetails": [
//         {
//             "collegeName": "ABC University",
//             "name": "John Doe",
//             "imageUrl": "https://example.com/john-doe.jpg",
//             "classroom": "Room A",
//             "experience": "5 years"
//         },
//         {
//             "collegeName": "XYZ College",
//             "name": "Jane Smith",
//             "imageUrl": "https://example.com/jane-smith.jpg",
//             "classroom": "Room B",
//             "experience": "8 years"
//         }
//     ]
// }
