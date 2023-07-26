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
        const studentsData = req.body; // JSON object with students information
        const update = { Students: studentsData };
        //console.log(update);
        // Use findOneAndUpdate without filter (it will find the only entry in the collection)
        const updatedStudents = await StudentCards.findOneAndUpdate({}, update, {
            new: true,
            upsert: true,
        });
        // console.log(updatedStudents);
        res.json({ message: 'student card added successfully', cards: updatedStudents });
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

// [
//     {
//         "description": "4 Years with IPEC have been life changing for me. From being just a student with dreams of making it to the IITs one day to today having secured AIR in JEE Advaned 2022 seems unreal.",
//         "air": 123,
//         "studentImg": "https://www.vidyamandir.com/assets/images/testimonials/ANILESH-BANSAL-AIR-31.png",
//         "studentDetails": {
//             "name": "Rohan khatri",
//             "classRoomDetails": "4 Year classroom program",
//             "enrollmentNo": "8P22AV1109"
//         },
//         "exam": "JEE ADVANCED 2023"
//     },
//     {
//         "description": "With IPEC dreams do come true. When I joined IPEC in its Two year program I wasn’t sure what rank am I going to get. But Ipec's faculty didn’t just teach me, they transformed me into a Top Achiever. ",
//         "air": 258,
//         "studentImg": "https://www.vidyamandir.com/assets/images/testimonials/HARSHIL-SINGLA-AIR-198.png",
//         "studentDetails": {
//             "name": "Harsh Mehta",
//             "classRoomDetails": "2 Year Classroom Program",
//             "enrollmentNo": "10P22001210"
//         },
//         "exam": "JEE ADVANCED 2023"
//     }
// ]
