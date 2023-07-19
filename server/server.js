const connectDb = require('./db')
const express = require('express');
const app = express();
const port = 3000;
const contentRoutes = require('./routes/ContentRoute');
const ContactRoutes = require('./routes/ContactRoute');
const RegistrationRoute = require('./routes/RegistrationRoute');
const bodyParser = require('body-parser');
const cors = require("cors");
const AboutRoute = require('./routes/AboutRoute');
const WhyIPEC_Route = require('./routes/WhyIpecRoute');
const FacultyHireRoute = require('./routes/FacultyHireRoute');
const CoursesRoute = require('./routes/CoursesRoute');
const cookieParser = require('cookie-parser');
// const path = require('path');

// Middleware
app.use(cors());
// app.use(express.static(path.join(__dirname, './dist')));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json(({ limit: '10mb' })));
app.use(cookieParser());


connectDb();


app.use('/api/auth', require('./auth/auth'));
app.use('/api/registration', RegistrationRoute);
app.use('/api/content', contentRoutes);
app.use('/api/AboutIpec', AboutRoute);
app.use('/api/whyIPEC', WhyIPEC_Route);
app.use('/api/facultyHire', FacultyHireRoute);
app.use('/api/Courses', CoursesRoute);
app.use('/api/Contact', ContactRoutes);
app.use('/api/testimonials', require('./routes/TestimonialsRoute'));
app.use('/api/home', require('./routes/HomeRoute'));

app.listen(port, () => {
    console.log(`app listning at port: ${port}`);
});
