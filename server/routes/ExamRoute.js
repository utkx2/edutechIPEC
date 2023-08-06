const express = require('express');
const router = express.Router();
const ExamController = require('../controller/examController');

const examController = new ExamController();

// Create a new exam
// http://localhost:3000/api/exam/newexam
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



// {
//     "name": "Sample Exam",
//         "instructions": "These are the exam instructions.",
//             "questions": [
//                 {
//                     "text": "What is the capital of France?",
//                     "imageUrl": "https://example.com/question-image.jpg",
//                     "options": [
//                         {
//                             "text": "London",
//                             "imageUrl": "https://example.com/option1-image.jpg"
//                         },
//                         {
//                             "text": "Rome",
//                             "imageUrl": "https://example.com/option4-image.jpg"
//                         }
//                     ],
//                     "correctOption": [1],
//                     "type": "multiple-choice"
//                 },
//                 {
//                     "text": "What is 2 + 2?",
//                     "imageUrl": "https://example.com/question2-image.jpg",
//                     "options": [
//                         {
//                             "text": "3"
//                         },
//                         {
//                             "text": "4"
//                         },
//                         {
//                             "text": "6"
//                         }
//                     ],
//                     "correctOption": [1],
//                     "type": "multiple-choice"
//                 },
//                 {
//                     "text": "Solve for x: 2x + 5 = 15",
//                     "type": "text-input",
//                     "correctTextInputAnswer": "5"
//                 }
//             ],
//                 "maxMarks": 100,
//                     "questionMarks": 5,
//                         "textNegativeMarks": 1,
//                             "mcqNegativeMarks": 2,
//                                 "totalTime": 120,
//                                     "subjects": [
//                                         {
//                                             "name": "Mathematics",
//                                             "startingQuestionNumber": 1,
//                                             "endingQuestionNumber": 2
//                                         },
//                                         {
//                                             "name": "General Knowledge",
//                                             "startingQuestionNumber": 3,
//                                             "endingQuestionNumber": 3
//                                         }
//                                     ]
// }
