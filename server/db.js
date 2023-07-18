const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

MONGO_CONNECTION = 'mongodb+srv://akshattamrakar:root@cluster0.0z0aan1.mongodb.net/edutech';

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