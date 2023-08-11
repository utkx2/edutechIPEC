const express = require('express');
const router = express.Router();
const { getExamNameAndScoreByUserId, getUsersScoresAndTextLinksByExamId } = require('../controller/examResultsController');
const { verifyToken, isAdmin } = require('../middleware/auth')


// Get name and score
router.get('/score/:userId', verifyToken, getExamNameAndScoreByUserId);

// Get by exam
router.get('/users/:examId', verifyToken, getUsersScoresAndTextLinksByExamId);


module.exports = router;
