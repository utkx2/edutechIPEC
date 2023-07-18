const ContactModel = require('../models/ContactModel');
const express = require('express');
const router = express.Router();

router.post('/contact', async (req, res) => {
    try {
        const userId = req.userId;
        const { name, email, mobile, message, selectedService } = req.body;

        if (!name || !email || !mobile || !message || !selectedService) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const contactForm = new ContactModel({
            userId,
            name,
            email,
            mobile,
            message,
        });

        await contactForm.save();
        res.json({ message: "Contact form submitted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

module.exports = router;