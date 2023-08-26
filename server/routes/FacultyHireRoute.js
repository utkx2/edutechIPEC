const express = require('express');
const FacultyHire = require('../models/FacultyHireModel');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');



// http://localhost:3000/api/facultyHire/upload
router.post('/upload', isAdmin, async (req, res) => {
    const {
        firstName, lastName, email,
        phoneNumber, gender, academicQualification, personalExperience, dob, category,
        addressLine1, addressLine2, addressLine3,
        city, state, zipcode, message
    } = req.body;
    // console.log(gender, category);
    // console.log(req.body);
    try {
        const FacultyCandidate = new FacultyHire({
            firstName, lastName, email,
            phoneNumber, gender, qualification: academicQualification, previousExperience: personalExperience, dob,
            category, addressLine1, addressLine2, addressLine3, city,
            state, zipcode, message
        });
        const saveForm = FacultyCandidate.save();
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

// http://localhost:3000/api/facultyHire/get
router.get("/get", isAdmin, async (req, res) => {

    try {
        const RecruitmentsList = await FacultyHire.find();
        // console.log(RecruitmentsList);
        res.status(200).json(RecruitmentsList);
    }
    catch (error) {
        // console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while submitting the gem registration form"

        });
    }

})

// http://localhost:3000/api/facultyHire/get/:id
router.get("/get/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const RecruitmentsList = await FacultyHire.findById({ _id: id });
        // console.log(RecruitmentsList);
        res.status(200).json(RecruitmentsList);
    }
    catch (error) {
        // console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while getting the registrations list "
        });
    }

})

// http://localhost:3000/api/facultyHire/delete/:id
router.delete("/delete/:id", isAdmin, async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    try {
        const RecruitmentsList = await FacultyHire.findByIdAndDelete({ _id: id });
        // console.log(RecruitmentsList);
        // console.log("User Deleted Successfully")
        res.status(200).json(RecruitmentsList);
    }
    catch (error) {
        // console.log('Error occurred while retrieving registrations:', error);
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