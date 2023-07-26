const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentHomePage = new Schema({
    Students: [{
        description: {
            type: String,
            required: true
        },
        air: {
            type: Number,
            required: true
        },
        studentImg: {
            type: String,
            required: true
        },
        studentDetails: {
            name: { type: String },
            classRoomDetails: { type: String },
            enrollmentNo: { type: String }
        },
        exam: {
            type: String,
            required: true
        }
    }]
});

StudentCards = mongoose.model('StudentCardsNew', StudentHomePage);
module.exports = StudentCards;