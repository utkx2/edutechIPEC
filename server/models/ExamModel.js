const mongoose = require('mongoose');
const { sentenceCase } = require('../config/functions');

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
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
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['multiple-choice', 'text-input'],
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

questionSchema.methods.toJSON = function () {
    const question = this.toObject();
    delete question.correctOption;
    delete question.correctTextInputAnswer;
    return question;
};

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        set: sentenceCase
    },
    questions: {
        type: [questionSchema],
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true });

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;