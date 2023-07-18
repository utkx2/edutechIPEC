const express = require('express');
const Registrations = require('../models/RegistrationsModel');
const router = express.Router();


// http://localhost:3000/api/registration/upload
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


// sample json data object
// {
//   "firstName": "John",
//   "lastName": "Doe",
//   "email": "johndoe1@example.com",
//   "phoneNumber": "1234567890",
//   "gender": "male",
//   "category":"general",
//   "fatherName": "Michael Doe",
//   "fatherNumber": "9876543210",
//   "motherName": "Sarah Doe",
//   "motherNumber": "8765432109",
//   "dob": "1990-01-01",
//   "addressLine1": "123 Main Street",
//   "addressLine2": "Apt 4B",
//   "addressLine3": "abc",
//   "city": "Exampleville",
//   "state": "California",
//   "zipCode": "12345",
//   "message": "Hello, I would like to inquire about your services.",
//   "schoolName": "Example High School"
// }



module.exports = router;