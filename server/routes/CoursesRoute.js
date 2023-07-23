const express = require('express');
const Courses = require('../models/CoursesModel');
const router = express.Router();


//  http://localhost:3000/api/Courses/upload
router.post('/upload', async (req, res) => {

    const { Title, AdmissionMode, CourseCode, CommencementDate, Phases, ClassesFrequency, ClassSchedule, StudyContent, ComprehensivePractice } = req.body;
    console.log(Title, AdmissionMode, CourseCode, Phases);

    try {
        const CoursesObj = new Courses({ Title, AdmissionMode, CourseCode, CommencementDate, Phases, ClassesFrequency, ClassSchedule, StudyContent, ComprehensivePractice });
        const savedData = await CoursesObj.save();

        res.status(200).json({
            success: true,
            message: "form submitted successfully",
            data: savedData,
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

router.delete("/remove", async (req, res) => {
    try {
        const CoursesContent = await Courses.findOneAndDelete({});
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

// Dummy Values in Json format to check
// {
//     "Title": "Introduction to Programming",
//         "AdmissionMode": "Online",
//             "CourseCode": "CS101",
//                 "CommencementDate": "2023-08-01",
//                     "Phases": "Phase 1",
//                         "ClassesFrequency": "Twice a week",
//                             "ClassSchedule": "Monday and Wednesday, 6 PM - 8 PM",
//                                 "StudyContent": "Lecture slides, video tutorials, and practice exercises",
//                                     "ComprehensivePractice": "Weekly coding assignments and quizzes"
// }
