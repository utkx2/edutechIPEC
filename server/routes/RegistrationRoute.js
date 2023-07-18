const express = require('express');
const RegistrationsModel = require('../models/RegistrationsModel');
const router = express.Router();

router.post('/upload', async (req, res) => {
    const { firstName, lastName, email,
        phoneNumber, gender, fatherName, fatherNumber, motherName, motherNumber, dob, category, addressLine1, addressLine2, addressLine3, city, state, zipcode, message } = req.body;
    console.log(gender, category);
    console.log(req.body);
    try {
        const Registrations = new RegistrationsModel({
            firstName, lastName, email,
            phoneNumber, gender, fatherName, fatherNumber, motherName, motherNumber, dob, category, addressLine1, addressLine2, addressLine3, city, state, zipCode: zipcode, message
        });
        const saveForm = Registrations.save();
        res.status(200).json({
            success: true,
            message: "form submitted successfully",
            data: saveForm,
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

module.exports = router;