const Exam = require('../models/ExamModel');

class ExamController {
  async createExam(req, res) {
    console.log(req.body);
    try {
      const { name, questions } = req.body;
      const exam = await Exam.create({ name, questions });
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
        throw new Error('Exam not found');
      }
  
      exam.status = !exam.status;
      await exam.save();
  
      return res.json(exam);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ExamController;
