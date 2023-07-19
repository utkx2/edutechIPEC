const mongoose = require('mongoose');
const { Schema } = mongoose;

const CoursesModel = new Schema({

    Title: {
        type: String,
    },
    AdmissionMode: {
        type: String,
    },
    CourseCode: {
        type: String,
    },
    CommencementDate: {
        type: String,
    },
    Phases: {
        type: String,
    },
    ClassesFrequency: {
        type: String,
    },
    ClassSchedule: {
        type: String
    },
    StudyContent: {
        type: String,
    },
    ComprehensivePractice: {
        type: String,
    }
},
);

const Courses = mongoose.model('courses', CoursesModel);

module.exports = Courses;