const connectDb = require('./db')
const express = require('express');
const app = express();
const port = 3000;
const contentRoutes = require('./routes/ContentRoute')
const RegistrationRoute = require('./routes/RegistrationRoute');
const bodyParser = require('body-parser');
const cors = require("cors");
const AboutRoute = require('./routes/AboutRoute');
const WhyIPEC_Route = require('./routes/WhyIpecRoute');
const FacultyHireRoute = require('./routes/FacultyHireRoute');
// const path = require('path');

// Middleware
app.use(cors());
// app.use(express.static(path.join(__dirname, './dist')));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json(({ limit: '10mb' })));

connectDb();


app.use('/api/auth', require('./auth/auth'));
app.use('/api/registration', require('./routes/RegistrationRoute'));
app.use('/api/content', require('./routes/ContentRoute'));
app.use('/api/AboutIpec', require('./routes/AboutRoute'));
app.use('/api/whyIPEC', require('./routes/WhyIpecRoute'));
app.use('/api/facultyHire', require('./routes/FacultyHireRoute'));

app.listen(port, () => {
    console.log(`app listning at port: ${port}`);
});
