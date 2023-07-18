const connectToMongoDB = require('./db');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

connectToMongoDB();

app.use('/api/auth', require('./auth/auth'));

app.listen(port, () => {
    console.log(`app listning at port: ${port}`);
});
