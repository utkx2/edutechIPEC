require('./config/db');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const app = express();
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const cloudinary = require('cloudinary').v2;

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


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


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


const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
});
const Image = mongoose.model('Image', imageSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/api/image/:id', async (req, res) => {
  try {
    const imageId = req.params.id;

    // Find the image by ID in the MongoDB database
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Convert image data to base64 and send it to the frontend
    const base64Data = image.data.toString('base64');
    res.json({ base64Data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/api/upload', async (req, res) => {
  try {
    const { image } = req.body;
    console.log(image);
    if (!image) {
      return res.status(400).json({ error: 'No image data received.' });
    }

    // Convert base64 image data to a Buffer
    const imageBuffer = Buffer.from(image, 'base64');

    const image1 = new Image({
      name: Date.now().toString(), // You can modify the name as per your requirement
      data: imageBuffer,
    });
    savedImage = await image1.save();
    const base64Data = image1.data.toString('base64');


    res.status(200).json({ message: 'Image uploaded successfully', imageId: savedImage._id, base64Image: base64Data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// upload the photo of home section of admin
app.use('/api/home/', express.static(path.join(__dirname, '/uploads').replace(/\\/g, '/')));
const multerMiddleware = multer();
app.post('/api/home/uploadImage', multerMiddleware.array('photos', 100), async (req, res) => {
  console.log(req.body);
  try {
    const uploadedFiles = [];

    for (const file of req.files) {
      // Convert the file buffer to a temporary file on the server
      const tempFilePath = `uploads/${Date.now()}_${file.originalname}`;
      await writeFileAsync(tempFilePath, file.buffer);

      // Upload the temporary file to Cloudinary
      const uploadedFile = await cloudinary.uploader.upload(tempFilePath, {
        folder: 'uploads', // Specify the folder in Cloudinary where the file should be saved
        use_filename: true // Use the original filename
      });

      // Store the public URL of the uploaded file in the array
      uploadedFiles.push(uploadedFile.secure_url);

      // Delete the temporary file from the server
      fs.unlinkSync(tempFilePath);
    }
    console.log(uploadedFiles);
    res.json(uploadedFiles);

  }
  catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    res.status(500).json({ error: 'Error uploading file to Cloudinary' });
  }
});





// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});