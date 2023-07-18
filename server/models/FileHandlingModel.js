const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileHandlingModel = new Schema({
    filename: String,
    originalname: String,
    path: String,
});

module.exports = mongoose.model('filehandling', FileHandlingModel);