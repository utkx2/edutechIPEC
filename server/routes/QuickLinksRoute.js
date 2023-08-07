const express = require('express');
const router = express.Router();
const FacultyCards = require('../models/QuickLinks');

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
        const facultyData = req.body; // JSON object with faculty information
        //      console.log(req.body);

        const update = { facultyMembers: facultyData };
        // console.log(update);
        // Use findOneAndUpdate without filter (it will find the only entry in the collection)
        const updatedFacultyList = await FacultyCards.findOneAndUpdate({}, update, {
            new: true,
            upsert: true,
        });
        res.json({ message: 'faculty card added successfully', card: updatedFacultyList });
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
        res.json({ message: 'Student home page card updated successfully', card: updatedCard });
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
//     "facultyMembers": [
//         {
//             "collegeName": "ABC College",
//             "name": "John Doe",
//             "facultyImg": "john_doe.jpg",
//             "classroom": "Room A",
//             "experience": "5 years"
//         },
//         {
//             "collegeName": "ABC College",
//             "name": "Jane Smith",
//             "facultyImg": "jane_smith.jpg",
//             "classroom": "Room B",
//             "experience": "10 years"
//         }
//     ]
// }