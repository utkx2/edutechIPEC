const ExamResults = require('../models/ExamResults');
const Exam = require('../models/ExamModel');
const User = require('../models/userModel');

// Controller to get exam name and score by userid
const getExamNameAndScoreByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const examResults = await ExamResults.findOne({ 'results.userId': userId });

    if (!examResults) {
      return res.status(404).json({ message: 'No exam results found for the user.' });
    }

    // Find the exam based on examId in the results
    const exam = await Exam.findById(examResults.examId);

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found.' });
    }

    // Get the score for the specific user
    const userScore = examResults.results.find((result) => result.userId.toString() === userId);

    return res.json({
      examName: exam.name,
      score: userScore.score,
    });
  } catch (error) {
    console.error('Error fetching exam results by user id:', error);
    res.status(500).json({ message: 'Error fetching exam results.' });
  }
};

// Controller to get all usernames, scores resonses by exam id
const getUsersScoresAndTextLinksByExamId = async (req, res) => {
  const examId = req.params.examId;

  try {
    // Find the ExamResults document for the given examId and populate the userId field
    const examResults = await ExamResults.findOne({ examId }).populate('results.userId');

    if (!examResults) {
      return res.status(404).json({ message: 'No exam results found for the exam.' });
    }

    // Get the user ids from the examResults
    const userIds = examResults.results.map((result) => result.userId);

    // Find the corresponding users in the User model using the userIds
    const users = await User.find({ _id: { $in: userIds } }).select('name');

    // Create a map of userId to username for easy lookup
    const userIdToUsernameMap = {};
    users.forEach((user) => {
      userIdToUsernameMap[user._id] = user.name;
    });

    // Map the results with usernames
    const userResults = examResults.results.map((result) => ({
      username: userIdToUsernameMap[result.userId._id],
      score: result.score,
      response: result.response,
    }));  

    return res.json({ userResults });
  } catch (error) {
    console.error('Error fetching by exam id:', error);
    res.status(500).json({ message: 'Error fetching exam results.' });
  }
};

module.exports = {
  getExamNameAndScoreByUserId,
  getUsersScoresAndTextLinksByExamId
};
