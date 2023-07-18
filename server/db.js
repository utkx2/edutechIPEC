const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/edutechIPEC";

async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongo;