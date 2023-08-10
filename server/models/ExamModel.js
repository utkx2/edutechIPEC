const mongoose = require('mongoose');
const { sentenceCase } = require('../config/functions');


const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startingQuestionNumber: { type: Number, required: true },
    endingQuestionNumber: { type: Number, required: true },
});

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        // required: true,
        set: sentenceCase
    },
    imageUrl: {
        type: String // URL to the image for the option
    }
});

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        set: sentenceCase
    },
    imageUrl: {
        type: String // URL to the image for the question
    },
    options: {
        type: [optionSchema],
        required: true,
    },
    correctOption: {
        type: [Number],
        // required: true,
    },
    type: {
        type: String,
        enum: ['multiple-choice', 'text-input', 'multiple-correct', 'matrix-match'],
        required: true
    },
    correctTextInputAnswer: {
        type: String,
        required: function () {
            return this.answerType === 'text-input';
        },
        set: (value) => value.toLowerCase(),
    }
});

// questionSchema.methods.toJSON = function () {
//     const question = this.toObject();
//     delete question.correctOption;
//     delete question.correctTextInputAnswer;
//     return question;
// };

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        set: sentenceCase
    },
    instructions: {
        type: String,
        // required: true,
        set: sentenceCase
    },
    questions: {
        type: [questionSchema],
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    maxMarks: {
        type: Number,
        required: true,
    },
    questionMarks: {
        type: Number,
        required: true,
    },
    textNegativeMarks: {
        type: Number,
        required: true,
    },
    mcqNegativeMarks: {
        type: Number,
        required: true,
    },
    totalTime: {
        type: Number,
        required: true,
    },
    subjects: {
        type: [subjectSchema], // Array of subjects, each containing name, startingQuestionNumber, and endingQuestionNumber
    },
    className: {
        type: String,
        required: true,
    }
},
    { timestamps: true });

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;