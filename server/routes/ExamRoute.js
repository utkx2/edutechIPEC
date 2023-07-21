const express = require('express');
const router = express.Router();
const ExamController = require('../controller/examController');

const examController = new ExamController();

// Create a new exam
router.post('/newexam', examController.createExam);

// Edit an existing exam
router.put('/byid/:id', examController.editExam);

// Delete an existing exam
router.delete('/byid/:id', examController.deleteExam);

// Get exam by ID
router.get('/byid/:id', examController.getExamById);

// Get all exams
router.get('/allexams', examController.getAllExams);

//Toggle status
router.put('/byid/:id/toggleStatus', examController.toggleStatus);

//Exams with status active
router.get('/active-exams', examController.getExamsWithStatusTrue);

//Exam without answers
router.get('/student-exam/:id', examController.getExamByIdWithoutCorrect);

//Calculate Score
router.post('/getscore/:id', examController.getExamScore);

module.exports = router;
