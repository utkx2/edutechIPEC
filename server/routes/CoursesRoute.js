const express = require('express');
const Courses = require('../models/CoursesModel');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');


//  http://localhost:3000/api/Courses/upload
router.post('/upload', isAdmin, async (req, res) => {
    try {
        const savedData = await Courses.create(req.body);

        res.status(200).json({
            success: true,
            message: "form submitted successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal error.",
            error: error.message,
        });
    }
});

router.get("/get", async (req, res) => {

    try {
        const CoursesContent = await Courses.find();
        console.log(CoursesContent);
        res.status(200).json(CoursesContent);
    }
    catch (error) {
        console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while submitting the gem registration form"
        });
    }
})

// http://localhost:3000/api/Courses/get/:id
router.get("/get/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const CoursesContent = await Courses.findById({ _id: id });
        console.log(CoursesContent);
        res.status(200).json(CoursesContent);
    }
    catch (error) {
        console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while submitting the gem registration form"

        });
    }
})

router.delete("/remove/:id", isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const CoursesContent = await Courses.findByIdAndDelete({ _id: id });
        console.log("Object Deleted:", CoursesContent);
        res.status(200).json(CoursesContent);
    }
    catch (error) {
        console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while submitting the gem registration form"

        });
    }
})

module.exports = router;
