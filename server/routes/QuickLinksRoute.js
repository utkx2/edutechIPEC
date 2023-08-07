const express = require('express');
const router = express.Router();
const QuickLinksModel = require('../models/QuickLinksModel');

// http://localhost:3000/api/QuickLinkHomePage/get
router.get('/get', async (req, res) => {
    try {
        const QuickLinksHomePageCards = await QuickLinksModel.find();
        res.json(QuickLinksHomePageCards);
    }
    catch (error) {
        console.error('error fetching the Quick Links cards', error);
        return res.status(500).json(error);
    }
});


// http://localhost:3000/api/QuickLinkHomePage/upload
router.post('/upload', async (req, res) => {
    try {
        const quickLinksData = req.body; // JSON object with faculty information
        //      console.log(req.body);
        console.log(quickLinksData);
        const update = { quickLinks: quickLinksData };
        // console.log(update);
        // Use findOneAndUpdate without filter (it will find the only entry in the collection)
        const updatedQuickLinksList = await QuickLinksModel.findOneAndUpdate({}, update, {
            new: true,
            upsert: true,
        });
        res.json({ message: 'Quick Links card added successfully', card: updatedQuickLinksList });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/QuickLinkHomePage/edit/:id
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedCard = await QuickLinksModel.findByIdAndUpdate(
            id,
            { data },
            { new: true } // This option returns the updated document
        );
        res.json({ message: 'Quick Links home page card updated successfully', card: updatedCard });
    }
    catch (error) {
        console.error('error occured', error);
        return res.status(500).json(error);
    }
});

// http://localhost:3000/api/QuickLinkHomePage/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await QuickLinksModel.findByIdAndRemove(id);
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