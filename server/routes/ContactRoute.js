const Contact = require('../models/ContactModel');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { verifyToken, isAdmin } = require('../middleware/auth');


const JWT_SECRET = 'alpha$dev';


// http://localhost:3000/api/Contact/upload
router.post('/upload', verifyToken, async (req, res) => {
    //  const { token } = req.cookies
    //  console.log(token);
    let userData;
    // if (token) {
    //     userData = jwt.verify(token, JWT_SECRET);
    //     // console.log(userData);
    // }
    try {
        // const userId = userData.user.id;
        // console.log(userId);
        const { name, email, mobile, message } = req.body;
        if (!name || !email || !mobile || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const contactForm = new Contact({
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

//  http://localhost:3000/api/Contact/allUsers
router.get('/allUsers', isAdmin, async (req, res) => {
    try {
        const usersList = await Contact.find();
        res.json(usersList).status(200);
    }
    catch (error) {
        // console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router;