require('./config/db');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Import Router
const userRouter = require('./routes/userRoutes')
const aboutRouter = require('./routes/AboutRoute');
const exam = require('./routes/ExamRoute');
const contentRouter = require('./routes/ContentRoute');
const contactRouter = require('./routes/ContactRoute');
const registrationRouter = require('./routes/RegistrationRoute');
const whyIPEC_Router = require('./routes/WhyIpecRoute');
const facultyHireRouter = require('./routes/FacultyHireRoute');
const coursesRouter = require('./routes/CoursesRoute');
const testimonials = require('./routes/TestimonialsRoute');
const home = require('./routes/HomeRoute');
const studentHomePage = require('./routes/StudentHomePageRoute');
const ourPrograms = require('./routes/OurProgramsHomePageRoute');
const facultyHomePage = require('./routes/FacultyRoute');
const carousel = require('./routes/CarouselRoute');
const download = require('./routes/DownloadRoute');
const results = require('./routes/ResultsRoute');
const examResults = require('./routes/ExamResults');

// Routes
app.get('/api', (req, res) => {
  const htmlResponse = `
    <html>
      <body>
        <h1>Welcome to EduTech</h1>
        <p>Chick <a href="https://www.edutech.com">here</a> to visit EduTech.com.</p>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.use("/api/user", userRouter);
app.use('/api/aboutipec', aboutRouter);
app.use('/api/exam', exam);
app.use('/api/examresults', examResults);
app.use('/api/registration', registrationRouter);
app.use('/api/content', contentRouter);
app.use('/api/whyIPEC', whyIPEC_Router);
app.use('/api/facultyHire', facultyHireRouter);
app.use('/api/Courses', coursesRouter);
app.use('/api/Contact', contactRouter);
app.use('/api/testimonials', testimonials);
app.use('/api/home', home);
app.use('/api/studentHomePage', studentHomePage);
app.use('/api/ourPrograms', ourPrograms);
app.use('/api/facultyHomePage', facultyHomePage);
app.use('/api/carousel', carousel);
app.use('/api/download', download);
app.use('/api/results', results);

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});