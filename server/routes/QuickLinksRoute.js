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

// http://localhost:3000/api/QuickLinkHomePage/get/:id
router.get("/get/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const QuickLinksContent = await QuickLinksModel.find();
        if (!QuickLinksContent) {
            return res.status(404).json({ error: "Course content not found" });
        }
        //console.log(QuickLinksContent[0]);
        const quickLink = await QuickLinksContent[0].quickLinks.find(link => link._id.toString() === id);
        console.log(quickLink);
        if (!quickLink) {
            return res.status(404).json({ error: "Quick link not found" });
        }
        //const CoursesContent = await QuickLinksModel.findById({ quickLinks._id: id });
        //  console.log(QuickLinksContent);
        res.status(200).json(quickLink);
    }
    catch (error) {
        console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while submitting the gem registration form"

        });
    }
})

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
        await QuickLinksModel.findByIdAndRemove({_id: id});
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