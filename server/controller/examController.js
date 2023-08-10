const Exam = require('../models/ExamModel');
const ExamResults = require('../models/ExamResults');

class ExamController {
  async createExam(req, res) {
    try {
      const { name, instructions, questions, maxMarks, questionMarks, totalTime, mcqNegativeMarks, textNegativeMarks, subjects, className } = req.body;
      const exam = await Exam.create({ name, instructions, questions, maxMarks, questionMarks, totalTime, mcqNegativeMarks, textNegativeMarks, subjects, className });
      res.status(200).json({ success: true, exam: exam });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Failed to create exam' });
    }
  }

  async editExam(req, res) {
    try {
      const examId = req.params.id;
      const { name, instructions, questions, questionMarks, maxMarks, totalTime, mcqNegativeMarks, textNegativeMarks, subjects, className } = req.body;
      const exam = await Exam.findByIdAndUpdate(examId, { name, instructions, questions, questionMarks, maxMarks, totalTime, mcqNegativeMarks, textNegativeMarks, subjects, className }, { new: true });
      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }
      res.json({ success: true, exam: exam });
    } catch (err) {
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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

  // async getAllExamsForStudent(req, res) {


  //   try {
  //     const exams = await Exam.find().select('name createdAt status');
  //     res.json({ success: true, exams: exams });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ error: 'Failed to get exams' });
  //   }
  // }

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
      res.status(500).json({ error: 'Failed to toggle exam status' });
    }
  }

  async getExamsWithStatusTrue(req, res) {
    try {
      const className = req.query.userClass;
      console.log(className);
      const examsWithStatusTrue = await Exam.find({ status: true, className: className }).select('name updatedAt');
      return res.json({ success: true, exams: examsWithStatusTrue });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to get exams' });
    }
  }

  async getExamByIdWithoutCorrect(req, res) {
    try {
      const examId = req.params.id;
      const exam = await Exam.findById(examId, { correctOption: 0, correctTextInputAnswer: 0 });
      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }
      return res.json({ success: true, exam: exam });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to get exams' });
    }
  }

  async getExamScore(req, res) {
    try {
      const examId = req.params.id;
      const { submittedAnswers, userId, response } = req.body;
      const exam = await Exam.findById(examId);

      if (!exam) {
        return res.status(404).json({ message: 'Exam not found.' });
      }

      let totalScore = 0;
      let NegativeCount = 0;
      let questionMarks = exam.questionMarks;
      let totalMarks = exam.maxMarks;
      for (const question of exam.questions) {
        if (submittedAnswers[question._id] === undefined) {
          continue; // Skip questions that have not been answered
        }

        if (question.type === 'multiple-choice' || question.type === 'multiple-correct' || question.type === 'matrix-match') {
          const submittedAnswer = submittedAnswers[question._id];
          const correctOption = question.correctOption;
          if (
            Array.isArray(submittedAnswer) &&
            Array.isArray(correctOption) &&
            submittedAnswer.length === correctOption.length &&
            submittedAnswer.every((option) => correctOption.includes(option)) &&
            correctOption.every((option) => submittedAnswer.includes(option))
          ) {
            totalScore = totalScore + questionMarks;
          } else {
            totalScore -= exam.mcqNegativeMarks;
            NegativeCount++;
          }
        } else if (question.type === 'text-input') {
          if (submittedAnswers[question._id].toLowerCase() === question.correctTextInputAnswer.toLowerCase()) {
            totalScore += questionMarks;
          } else {
            totalScore -= exam.textNegativeMarks;
            NegativeCount++;
          }
        }
      }
      // console.log(totalScore);
      // console.log(NegativeCount);
      const existingExamResult = await ExamResults.findOne({ examId: exam._id });

      if (existingExamResult) {
        existingExamResult.results.push({
          userId: userId,
          response: response,
          score: totalScore,
          negativeCount: NegativeCount
        });

        await existingExamResult.save();
      } else {
        const examResult = new ExamResults({
          examId: exam._id,
          results: [{
            userId: userId,
            response: response,
            score: totalScore,
            negativeCount: NegativeCount
          }],
        });

        await examResult.save();
      }

      res.json({ score: totalScore, maxMarks: totalMarks });
    } catch (error) {
      console.error('Error calculating score and storing exam result:', error);
      res.status(500).json({ message: 'Error calculating score and storing exam result.' });
    }
  }

}

module.exports = ExamController;
