const connectDb = require('./db')
const express = require('express');
const app = express();
const port = 3000;
const contentRoutes = require('./routes/ContentRoute')
const RegistrationRoute = require('./routes/RegistrationRoute');
const bodyParser = require('body-parser');
const cors = require("cors");
// const path = require('path');

// Middleware
app.use(cors());
// app.use(express.static(path.join(__dirname, './dist')));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

connectDb();

app.use('/api/auth', require('./auth/auth'));
app.use('/api/registration', RegistrationRoute);
app.use('/api/content', contentRoutes);

app.listen(port, () => {
    console.log(`app listning at port: ${port}`);
});
