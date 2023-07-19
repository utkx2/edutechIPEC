const express = require('express');
const About = require('../models/AboutModel');
const router = express.Router();


//  http://localhost:3000/api/AboutIpec/upload
router.post('/upload', async (req, res) => {

    const { AboutIPEC, ipecAdvantages, ipecPedagogy } = req.body;
    console.log(AboutIPEC, ipecAdvantages, ipecPedagogy);

    try {
        const AboutObj = new About({ AboutIPEC, ipecAdvantages, ipecPedagogy });
        const savedData = await AboutObj.save();

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


//  http://localhost:3000/api/AboutIpec/edit
router.put('/edit', async (req, res) => {

    const { AboutIPEC, ipecAdvantages, ipecPedagogy } = req.body;
    console.log(AboutIPEC, ipecAdvantages, ipecPedagogy);

    try {
        const AboutObj = About.findOneAndUpdate({ AboutIPEC, ipecAdvantages, ipecPedagogy });
        const savedData = await AboutObj.save();

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
        const AboutContent = await About.find();
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
        const AboutContent = await About.findOneAndDelete({});
        console.log("Object Deleted:", AboutContent);
        res.status(200).json(AboutContent);
    }
    catch (error) {
        console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while submitting the gem registration form"

        });
    }
})

module.exports = router;