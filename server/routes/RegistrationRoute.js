const express = require('express');
const Registrations = require('../models/RegistrationsModel');
const router = express.Router();


// http://localhost:3000/api/registration/upload
router.post('/upload', async (req, res) => {
    try {
        // Save the entire req.body object as a JSON document
        const formData = new Registrations(req.body);
    
        // Save the data to the database (this assumes FormDataModel is a Mongoose model)
        await formData.save();
    
        // Send a success response
        res.status(201).json({ message: 'Form data saved successfully.' });
      } catch (err) {
        // Handle any unexpected errors
        console.error('Error while saving form data:', err);
        res.status(500).json({ message: 'An error occurred while processing the request.' });
      }
});

// http://localhost:3000/api/registration/get
router.get("/get", async (req, res) => {

    try {
        const registrationsList = await Registrations.find();
        console.log(registrationsList);
        res.status(200).json(registrationsList);
    }
    catch (error) {
        console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while getting the registrations list "
        });
    }

})


// http://localhost:3000/api/registration/get/:id
router.get("/get/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const registrationsList = await Registrations.findById({ _id: id });
        console.log(registrationsList);
        res.status(200).json(registrationsList);
    }
    catch (error) {
        console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while getting the registrations list "
        });
    }

})


// http://localhost:3000/api/registration/delete/:id
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const registrationsList = await Registrations.findByIdAndDelete({ _id: id });
        console.log(registrationsList);
        console.log("registration Deleted Successfully")
        res.status(200).json(registrationsList);
    }
    catch (error) {
        console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while deleting the registration"
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