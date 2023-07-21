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

// Controller to get all usernames, scores, and links to download binary in text format by exam id
const getUsersScoresAndTextLinksByExamId = async (req, res) => {
  const examId = req.params.examId;

  try {
    const examResults = await ExamResults.findOne({ examId });

    if (!examResults) {
      return res.status(404).json({ message: 'No exam results found for the exam.' });
    }

    // Fetch all users
    const users = await User.find({});

    const userResults = [];
    for (const result of examResults.results) {
      const user = users.find((user) => user._id.toString() === result.userId.toString());

      if (user) {
        // Step 1: Convert binary data back to a text file
        const textFileName = `result_${user.name}.txt`;
        const textFilePath = path.join(__dirname, '..', 'public', 'exam_results', textFileName);
        const textFileContent = Buffer.from(result.binaryData, 'base64').toString();
        fs.writeFileSync(textFilePath, textFileContent);

        userResults.push({
          username: user.name,
          score: result.score,
          linkToDownloadText: `/api/examresults/download/${result._id}`,
          textFileName: textFileName,
        });
      }
    }

    return res.json({ userResults });
  } catch (error) {
    console.error('Error fetching users, scores, and links by exam id:', error);
    res.status(500).json({ message: 'Error fetching exam results.' });
  }
};


  
module.exports = {
  getExamNameAndScoreByUserId,
  getUsersScoresAndTextLinksByExamId
};
