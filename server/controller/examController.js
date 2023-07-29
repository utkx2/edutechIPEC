const Exam = require('../models/ExamModel');
const ExamResults = require('../models/ExamResults');

class ExamController {
  async createExam(req, res) {
    console.log(req.body);
    try {
      const { name, instructions, questions } = req.body;
      const exam = await Exam.create({ name, instructions, questions });
      res.status(200).json({ success: true, exam: exam });
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Failed to create exam' });
    }
  }

  async editExam(req, res) {
    try {
      const examId = req.params.id;
      const { name, questions } = req.body;
      const exam = await Exam.findByIdAndUpdate(examId, { name, questions }, { new: true });
      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }
      res.json({ success: true, exam: exam });
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Failed to edit exam' });
    }
  }

  async deleteExam(req, res) {
    try {
      const examId = req.params.id;
      const exam = await Exam.findByIdAndDelete(examId);
      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }
      res.json({ success: true, message: 'Exam deleted successfully' });
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Failed to delete exam' });
    }
  }

  async getExamById(req, res) {
    try {
      const examId = req.params.id;
      const exam = await Exam.findById(examId);
      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }
      res.json({ success: true, exam: exam });
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Failed to get exam' });
    }
  }

  async getAllExams(req, res) {
    try {
      const exams = await Exam.find().select('name createdAt status');
      res.json({ success: true, exams: exams });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to get exams' });
    }
  }

  async toggleStatus(req, res) {
    try {
      const examId = req.params.id;
      const exam = await Exam.findById(examId);
      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }

      exam.status = !exam.status;
      await exam.save();

      return res.json(exam);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to get exams' });
    }
  }

  async getExamsWithStatusTrue(req, res) {
    try {
      const examsWithStatusTrue = await Exam.find({ status: true }).select('name updatedAt');
      return res.json({ success: true, exams: examsWithStatusTrue });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to get exams' });
    }
  };

  async getExamByIdWithoutCorrect(req, res) {
    try {
      const examId = req.params.id;
      const exam = await Exam.findById(examId, { correctOption: 0, 'questions.correctTextInputAnswer': 0 });
      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }
      return res.json({ success: true, exam: exam });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to get exams' });
    }
  };

  async getExamScore(req, res) {
    try {
      const examId = req.params.id;
      const { submittedAnswers, userId, response } = req.body;

      // Get the exam from the database
      const exam = await Exam.findById(examId);

      if (!exam) {
        return res.status(404).json({ message: 'Exam not found.' });
      }

      let totalScore = 0;

      // Calculate score for each question
      for (const question of exam.questions) {
        if (submittedAnswers[question._id] === undefined) {
          continue; // Skip questions that have not been answered
        }

        if (question.type === 'multiple-choice') {
          // Check if the selected option matches the correct option
          if (submittedAnswers[question._id] == question.correctOption) {
            totalScore++;
          }
        } else if (question.type === 'text-input') {
          // Check if the text input answer matches the correctTextInputAnswer
          if (submittedAnswers[question._id].toLowerCase() == question.correctTextInputAnswer.toLowerCase()) {
            totalScore++;
          }
        }
      }

      // Check if there is an existing exam result for the given exam ID
      const existingExamResult = await ExamResults.findOne({ examId: exam._id });

      if (existingExamResult) {
        // If an existing exam result is found, add the new result to the results array
        existingExamResult.results.push({
          userId: userId,
          response: response,
          score: totalScore,
        });

        await existingExamResult.save();
      } else {
        // If no existing exam result is found, create a new ExamResults object
        const examResult = new ExamResults({
          examId: exam._id,
          results: [{
            userId: userId,
            response: response,
            score: totalScore,
          }],
        });

        await examResult.save();
      }

      res.json({ score: totalScore });
    } catch (error) {
      console.error('Error calculating score and storing exam result:', error);
      res.status(500).json({ message: 'Error calculating score and storing exam result.' });
    }
  }

}

module.exports = ExamController;
