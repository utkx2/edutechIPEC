const express = require('express');
const whyIPEC = require('../models/WhyIpecModel');
const router = express.Router();


//  http://localhost:3000/api/whyIPEC/upload
router.post('/upload', async (req, res) => {

    const { Title, Content, Reasons } = req.body;
    console.log(Title, Content, Reasons);

    try {
        const whyIPEC_Obj = new whyIPEC({ Title, Content, Reasons });
        const savedData = await whyIPEC_Obj.save();

        res.status(200).json({
            success: true,
            message: "form submitted successfully",
            data: savedData,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while submitting the gem registration form",
            error: error.message,
        });
    }
});


router.get("/get", async (req, res) => {

    try {
        const AboutContent = await whyIPEC.find();
        console.log(AboutContent);
        res.status(200).json(AboutContent);
    }
    catch (error) {
        console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while submitting the gem registration form"

        });
    }
})

router.delete("/remove", async (req, res) => {
    try {
        const whyIPEC_Content = await whyIPEC.findOneAndDelete({});
        console.log("Object Deleted:", whyIPEC_Content);
        res.status(200).json(whyIPEC_Content);
    }
    catch (error) {
        console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while submitting the gem registration form"

        });
    }
})

module.exports = router;