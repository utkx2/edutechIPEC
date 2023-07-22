const express = require('express');
const router = express.Router();
const { getExamNameAndScoreByUserId, getUsersScoresAndTextLinksByExamId } = require('../controller/examResultsController');

// Get name and score
router.get('/score/:userId', getExamNameAndScoreByUserId);

// Get by exam
router.get('/users/:examId', getUsersScoresAndTextLinksByExamId);


module.exports = router;
