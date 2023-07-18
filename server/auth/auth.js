const UserAuth = require('../models/AuthModel');
const express = require('express');
const router = express.Router();
const FetchUser = require('../middleware/FetchUser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'alpha$dev';


// Create a UserAuth using: POST "/api/auth/register".
router.post('/register', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await UserAuth.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await UserAuth.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // res.json(user)
        res.json({ authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Authenticate a UserAuth using: POST "/api/auth/login".
router.post('/login', [
    body('email', 'invalid email/password').isEmail(),
    body('password', 'invalid email/password').exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        let user = await UserAuth.findOne({ email });
        if (!user) {
            return res.status(401).json({ errors: "Incorrect credentials" });
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(401).json({ errors: "Incorrect credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Get loggedin UserAuth Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', FetchUser, async (req, res) => {
    try {
        const user = await UserAuth.findById(req.user.id).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
