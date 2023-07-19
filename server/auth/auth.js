const UserAuth = require('../models/AuthModel');
const express = require('express');
const router = express.Router();
const FetchUser = require('../middleware/FetchUser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'alpha$dev';
const { v4: uuidv4 } = require('uuid');


const generateUUID = function () {
    const pattern = /[a-zA-Z0-9]/;
    let uuid = '';

    while (uuid.length < 6) {
        const char = uuidv4().charAt(0);
        if (pattern.test(char)) {
            uuid += char;
        }
    }
    return uuid;
}

// Create a UserAuth using: POST "/api/auth/register".
// http://localhost:3000/api/auth/register
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
        // const userId = floor(rand() * 100);
        console.log(secPass);
        const userId = generateUUID();
        const role = "admin";
        user = await UserAuth.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            userId: userId,
            phoneNumber: req.body.phoneNumber,
            userRole: req.body.userRole
        });
        console.log(user);
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
// http://localhost:3000/api/auth/login
router.post('/login', async (req, res) => {
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
                id: user.id,
                Role: user.Role,
                name: user.name
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.cookie('token', authtoken).json({ authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// get all usersList
//  http://localhost:3000/api/auth/allUsers
router.get('/allUsers', async (req, res) => {
    try {
        const usersList = await UserAuth.find();
        res.json(usersList).status(200);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


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


// {
//     "name": "John Doe",
//         "email": "johndoe4@example.com",
//             "password": "123456",
//                 "userRole": "admin",
//                     "phoneNumber": 1234567890
// }