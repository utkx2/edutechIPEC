const express = require('express');
const Registrations = require('../models/RegistrationsModel');
const router = express.Router();
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const { verifyToken, isAdmin } = require('../middleware/auth');

// const axios = require('axios');


const sendEmail = async (pdfBuffer, email) => {
    try {
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // e.g., 'gmail'
            auth: {
                user: 't.guptacool1909@gmail.com',
                pass: 'hdquiboomzjchpiz',
            },
        });
        // Set up email data
        const mailOptions = {
            from: 'palkeshpatna@gmail.com',
            to: `${email}`,
            subject: 'IPEC Exam Admit Card',
            text: 'Please find the PDF attached.',
            attachments: [
                {
                    filename: 'AdmitCard.pdf',
                    content: pdfBuffer,
                },
            ],
        };
        // Send the email with attached PDF
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error sending email:', err);
    }
};

// http://localhost:3000/api/registration/upload
router.post('/upload', isAdmin, async (req, res) => {
    const { firstName, lastName, email,
        phoneNumber, gender, selectedClass, fatherName, fatherNumber, motherName, motherNumber, dob, category, addressLine1, addressLine2, addressLine3, city, state, zipCode, message } = req.body;
    // console.log(selectedClass, category);
    // console.log(req.body);

    const dataFromAPI = req.body;

    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        sendEmail(pdfBuffer, email);
    });

    const columns = 2;
    const columnGap = 20;
    const columnWidth = (doc.page.width - columnGap) / columns;

    // Function to add text to the PDF in two columns
    const addToColumns = (text1, text2) => {
        doc.text(text1, { width: columnWidth, align: 'left' })
            .text(text2, { width: columnWidth, align: 'left' })
            .moveDown(0.5); // Add some space between rows
    };

    // Add text to the PDF in two columns
    doc.fontSize(18).text('Personal Information', { align: 'center' });
    addToColumns('Full Name:', `${firstName} ${lastName}`);
    addToColumns('Email:', email);
    addToColumns('Phone Number:', phoneNumber);
    addToColumns('Gender:', gender);
    addToColumns('Selected Class:', selectedClass);

    doc.fontSize(18).text('Parent Information', { align: 'center' });
    addToColumns(`Father's Name:`, fatherName);
    addToColumns(`Father's Phone Number:`, fatherNumber);

    doc.fontSize(18).text('Address', { align: 'center' });

    addToColumns('City:', city);
    addToColumns('State:', state);

    doc.fontSize(18).text('Other Information', { align: 'center' });
    addToColumns('Date of Birth:', dob);
    addToColumns('Category:', category);

    doc.end();



    try {
        const newRegistrations = new Registrations({
            firstName, lastName, email,
            phoneNumber, gender, selectedClass, fatherName, fatherNumber, motherName, motherNumber, dob, category, addressLine1, addressLine2, addressLine3, city, state, zipCode: zipCode, message
        });
        const saveForm = newRegistrations.save();
        res.status(200).json({
            success: true,
            message: "form submitted successfully",
            data: saveForm,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while submitting the registration form",
            error: error.message,
        });
    }
});

// http://localhost:3000/api/registration/get
router.get("/get", isAdmin, async (req, res) => {

    try {
        const registrationsList = await Registrations.find();
        // console.log(registrationsList);
        res.status(200).json(registrationsList);
    }
    catch (error) {
        // console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while getting the registrations list "
        });
    }

})


// http://localhost:3000/api/registration/get/:id
router.get("/get/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const registrationsList = await Registrations.findById({ _id: id });
        // console.log(registrationsList);
        res.status(200).json(registrationsList);
    }
    catch (error) {
        // console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while getting the registrations list "
        });
    }

})


// http://localhost:3000/api/registration/delete/:id
router.delete("/delete/:id", isAdmin, async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    try {
        const registrationsList = await Registrations.findByIdAndDelete({ _id: id });
        // console.log(registrationsList);
        // console.log("registration Deleted Successfully")
        res.status(200).json(registrationsList);
    }
    catch (error) {
        // console.log('Error occurred while retrieving registrations:', error);
        res.status(500).json({
            error: "An error occurred while deleting the registration"
        });
    }
})


// sample json data object
// {
//   "firstName": "John",
//   "lastName": "Doe",
//   "email": "johndoe1@example.com",
//   "phoneNumber": "1234567890",
//   "gender": "male",
//   "category":"general",
//   "fatherName": "Michael Doe",
//   "fatherNumber": "9876543210",
//   "motherName": "Sarah Doe",
//   "motherNumber": "8765432109",
//   "dob": "1990-01-01",
//   "addressLine1": "123 Main Street",
//   "addressLine2": "Apt 4B",
//   "addressLine3": "abc",
//   "city": "Exampleville",
//   "state": "California",
//   "zipCode": "12345",
//   "message": "Hello, I would like to inquire about your services.",
//   "schoolName": "Example High School"
// }



module.exports = router;