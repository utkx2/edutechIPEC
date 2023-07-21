const mongoose = require('mongoose');

const examResultsSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  results: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    response: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    score:{
        type:Number,
        required: true
    }
  }],
});

const ExamResults = mongoose.model('ExamResults', examResultsSchema);

module.exports = ExamResults;