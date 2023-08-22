const mongoose = require('mongoose');

const PopUpSchema = new mongoose.Schema({
    image: String,
    redirectURL: String,
});

module.exports = mongoose.model('PopUpSchema', PopUpSchema);