const express = require('express');
const Registrations = require('../models/RegistrationsModel');
const router = express.Router();

router.post('/upload', async (req, res) => {
    const { firstName, lastName, email,
        phoneNumber, gender, fatherName, fatherNumber, motherName, motherNumber, dob, category, addressLine1, addressLine2, addressLine3, city, state, zipcode, message } = req.body;
    console.log(gender, category);
    console.log(req.body);
    try {
        const Registrations = new Registrations({
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


router.get("/get", async (req, res) => {

    try {
        const registrationsList = await Registrations.find();
        console.log(registrationsList);
        res.status(200).json(registrationsList);
    }
    catch (error) {
        console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while submitting the gem registration form"

        });
    }

})

module.exports = router;