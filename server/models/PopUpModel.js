const mongoose = require('mongoose');

const PopUpSchema = new mongoose.Schema({
    image: String
});

module.exports = mongoose.model('PopUpSchema', PopUpSchema);