const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String // URL to the image for the option
    }
});

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String // URL to the image for the question
    },
    options: {
        type: [optionSchema],
        required: true,
        // validate: [optionsLimit, 'Questions must have at least 4 options']
    },
    correctOption: {
        type: Number,
        required: function () {
            return this.answerType === 'multiple-choice';
        },
        min: 0,
        max: 3
    },
    answerType: {
        type: String,
        enum: ['multiple-choice', 'text-input'],
        required: true
    },
    correctTextInputAnswer: {
        type: String, // For text-input type questions, store the correct answer here
        required: function () {
            return this.answerType === 'text-input';
        }
    }
});

function optionsLimit(val) {
    return val.length >= 4;
}

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;