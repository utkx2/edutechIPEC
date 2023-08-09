const express = require('express');
const router = express.Router();
const Result = require('../models/ResultsModel');
const { verifyToken, isAdmin } = require('../middleware/auth');


// Create a new Result with student information
//http://localhost:3000/api/results/upload
router.post('/upload', isAdmin, async (req, res) => {
    try {
        const { examName, students } = req.body;
        console.log(req.body);

        const query = {};
        const update = { examName, students };
        const options = { new: true, upsert: true };

        const newResult = await Result.findOneAndUpdate(query, update, options);

        console.log(newResult);
        res.json(newResult);
    } catch (error) {
        console.error('Error creating Result:', error);
        res.status(500).json({ error: 'Error creating Result' });
    }
});


// Get all Results with student information
//http://localhost:3000/api/results/get
router.get('/get', async (req, res) => {
    try {
        const Results = await Result.find();
        res.json(Results);
    } catch (error) {
        console.error('Error fetching Results:', error);
        res.status(500).json({ error: 'Error fetching Results' });
    }
});


// Update an Result by Result ID with student information
//http://localhost:3000/api/results/edit/:id
router.put('/edit/', isAdmin, async (req, res) => {
    try {
        const { examName, students } = req.body;
        //  const ResultId = req.params.id;
        const updatedResult = await Result.findOneAndUpdate(
            {},
            { examName, students },
            { new: true, upsert: true }
            // Return the updated Result after update
        );
        res.json(updatedResult);
    } catch (error) {
        console.error('Error updating Result:', error);
        res.status(500).json({ error: 'Error updating Result' });
    }
});


// Delete an Result by Result ID
//http://localhost:3000/api/results/delete/:id
router.delete('/delete/:id', isAdmin, async (req, res) => {
    try {
        const ResultId = req.params.id;
        await Result.findByIdAndRemove(ResultId);
        res.json({ message: 'Result deleted successfully' });
    } catch (error) {
        console.error('Error deleting Result:', error);
        res.status(500).json({ error: 'Error deleting Result' });
    }
});

module.exports = router;


// {
//     "examName": "JEE Advance Results 2023",
//         "students": [
//             {
//                 "centreName": "ABC School",
//                 "studentName": "John Doe",
//                 "IPECRollNo": "IPEC123",
//                 "CRLRank": 1
//             },
//             {
//                 "centreName": "XYZ School",
//                 "studentName": "Jane Smith",
//                 "IPECRollNo": "IPEC456",
//                 "CRLRank": 2
//             }
//         ]
// }
