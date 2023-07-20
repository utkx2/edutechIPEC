const express = require('express');
const router = express.Router();
const Exam = require('../models/ExamModel'); // Import the Exam model

// POST route to create a new exam

// http://localhost:3000/api/exam/upload
router.post('/upload', async (req, res) => {
    try {
        const { name, questions } = req.body;
        const newExam = new Exam({ name, questions });
        const savedExam = await newExam.save();
        res.json(savedExam);
    } catch (error) {
        console.error('Error creating the exam:', error);
        res.status(500).json({ error: 'Error creating the exam' });
    }
});


// GET route to fetch all exams
// this one is for getting exam form for admin
// http://localhost:3000/api/exam/get      
router.get('/get', async (req, res) => {
    try {
        const exams = await Exam.find();
        console.log(exams[0].questions);
        res.json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ error: 'Error fetching exams' });
    }
});


// GET route to fetch all exam details without correctOption and correctTextInputAnswer
// this one is for getting exam form for user or student who see everything except correct option
// http://localhost:3000/api/exam/getUI      
router.get('/getUI', async (req, res) => {
    try {
        const exams = await Exam.find().lean();

        // Remove correctOption and correctTextInputAnswer from all questions in each exam
        const examsWithoutCorrect = exams.map((exam) => {
            const questionsWithoutCorrect = exam.questions.map((question) => {
                const {
                    correctOption,
                    correctTextInputAnswer,
                    ...questionWithoutCorrect
                } = question;
                return questionWithoutCorrect;
            });
            return { ...exam, questions: questionsWithoutCorrect };
        });

        res.json(examsWithoutCorrect);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ error: 'Error fetching exams' });
    }
});




// PUT route to edit an exam

// http://localhost:3000/api/edit/:id
router.put('/edit/:id', async (req, res) => {
    const examId = req.params.id;
    try {
        const { name, questions } = req.body;
        const updatedExam = await Exam.findByIdAndUpdate(examId, { name, questions }, { new: true });
        if (!updatedExam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.json(updatedExam);
    } catch (error) {
        console.error('Error updating the exam:', error);
        res.status(500).json({ error: 'Error updating the exam' });
    }
});

// DELETE route to delete an exam by ID

// http://localhost:3000/api/exam/delete/:id
router.delete('/delete/:id', async (req, res) => {
    const examId = req.params.id;
    try {
        const deletedExam = await Exam.findByIdAndRemove(examId);
        if (!deletedExam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.json({ message: 'Exam deleted successfully' });
    } catch (error) {
        console.error('Error deleting the exam:', error);
        res.status(500).json({ error: 'Error deleting the exam' });
    }
});


// API route to get the score based on user answers
// this api is for submitting paper and getting result of that paper
// http://localhost:3000/api/exam/score
router.post('/score', async (req, res) => {
    const { examId, userAnswers } = req.body;
    try {
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        let score = 0;
        for (let i = 0; i < userAnswers.length; i++) {
            const question = exam.questions[i];
            const userAnswer = userAnswers[i];
            if (question.answerType === 'multiple-choice' && userAnswer === question.correctOption) {
                score++;
            } else if (question.answerType === 'text-input' && userAnswer.toLowerCase() === (question.correctTextInputAnswer).toLowerCase()) {
                score++;
            }
        }

        return res.json({ score });
    } catch (err) {
        console.error('Error while calculating score:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;


// {
//     "name": "Science Quiz",
//         "questions": [
//             {
//                 "text": "What is the capital of France?",
//                 "options": [
//                     { "text": "Paris" },
//                     { "text": "London" },
//                     { "text": "Berlin" },
//                     { "text": "Rome" }
//                 ],
//                 "correctOption": 0,
//                 "answerType": "multiple-choice"
//             },
//             {
//                 "text": "What is the chemical symbol of water?",
//                 "options": [
//                     { "text": "H2O" },
//                     { "text": "CO2" },
//                     { "text": "O2" },
//                     { "text": "NaCl" }
//                 ],
//                 "correctOption": 0,
//                 "answerType": "multiple-choice"
//             },
//             {
//                 "text": "Enter the full form of DNA:",
//                 "options": [],
//                 "answerType": "text-input",
//                 "correctTextInputAnswer": "Deoxyribonucleic Acid"
//             }
//         ]
// }
