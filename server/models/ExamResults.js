const mongoose = require('mongoose');

const examResultsSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  // maxMarks:{
  //   type: Number,
  //   default: 0,
  //   required: true,
  // },
  results: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    response: {
      type: mongoose.Schema.Types.Mixed,
    },
    score: {
      type: Number,
      required: true
    },
    negativeCount: {
      type: Number
    }
  }],
});

const ExamResults = mongoose.model('ExamResults', examResultsSchema);

module.exports = ExamResults;