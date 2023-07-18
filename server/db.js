const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

MONGO_CONNECTION = 'mongodb+srv://user:user@ipec.9t0esx2.mongodb.net/?retryWrites=true&w=majority';

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