const express = require('express')
const router = express.Router();
const User = require('../models/UserModel');


// Create a User using: POST "/api/auth/". Doesn't require Auth
router.get('/', (req, res) => {
    const user = User(req.body);
    user.save();
    res.send(req.body);
});

module.exports = router;