const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

MONGO_CONNECTION = process.env.MONGO_CONNECTION;
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(MONGO_CONNECTION);
        console.log('database connected Successfully');
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;