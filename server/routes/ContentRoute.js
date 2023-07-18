const ContentModel = require('../models/ContentModel');
const espress = require('express');
const router = express.Router();

router.get('/why', async (req, res) => {
    try {
        const whyContent = await ContentModel.findOne({});
        if (!whyContent) {
            return res.status(404).json({ error: "Content not found" });
        }
        const whyIPECdescription = whyContent.whyIPEC.description;
        const whyIPECsubTexts = whyContent.whyIPEC.subTexts;

        res.json({
            description: whyIPECdescription,
            subTexts: whyIPECsubTexts
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occoured" });
    }
});

router.get('/about', async (req, res) => {
    try {
        
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occoured" });
    }
});

module.exports = router;