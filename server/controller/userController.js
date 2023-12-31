const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
require('dotenv').config();
const nodemailer = require('nodemailer');
const XLSX = require('xlsx');

let otpGlobal;

const sendEmail = async (mail, password) => {
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
        // var OTP1 = Math.floor(Math.random() * 10000) + 10000;
        // otpGlobal = OTP1;
        const mailOptions = {
            from: process.env.Email,
            to: `${mail}`,
            subject: 'IPEC Portal Credentials',
            text: `Hello!\n\nYou're receiving this email for your IPEC account.\n\nYour Email: ${mail}\nYour Password: ${password}\n`,
        };
        // Send the email with attached PDF
        // console.log(otpGlobal);
        await transporter.sendMail(mailOptions);
        return true;

    } catch (err) {
        console.error('Error sending email:', err);
    }
};

class User {

    async postSignup(req, res) {

        try {
            const {
                email,
                mobileNumber,
                className,
                password,
                ...userData
            } = req.body;

            // Check if email already exists in the database
            const existingEmailUser = await userModel.findOne({ email });
            if (existingEmailUser) {
                return res.status(409).json({ error: 'Email already exists' });
            }

            // Check if phone number already exists in the database
            const existingMobileUser = await userModel.findOne({ mobileNumber });
            if (existingMobileUser) {
                return res.status(409).json({ error: 'Phone number already exists' });
            }

            // Hash the password using bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create a new user document based on the UserModel
            const newUser = new userModel({
                ...userData,
                email,
                mobileNumber,
                password: hashedPassword,
                className
            });

            // Save the new user to the database
            await newUser.save().then((data) => {
                const { password, __v, ...user } = data._doc;
                // const token = jwt.sign({ user }, JWT_SECRET);

                return res.status(200).json({
                    success: true,
                    // token: token,
                    user: user,
                    status: true,
                });
            }).catch((err) => {
                console.log(err);
            });

        } catch (error) {
            // If there's an error, handle it here
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async bulkUpload(req, res) {
        try {
            // Parse the uploaded Excel file and extract data
            const { buffer } = req.file;
            // console.log(req.file);
            // console.log('Buffer Data:', buffer);
            const workbook = XLSX.read(buffer); // Parse the file buffer
            const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
            const sheet = workbook.Sheets[sheetName];
            const usersArray = XLSX.utils.sheet_to_json(sheet);
            // console.log(usersArray);
            for (const user of usersArray) {
                const saltRounds = 10;
                // console.log((user.password).toString());
                const hashedPassword = await bcrypt.hash((user.password).toString(), saltRounds);
                const email = user.email;
                const name = user.name;
                const mobileNumber = user.phoneNumber;
                const className = user.class;
                const newUser = new userModel({
                    email,
                    mobileNumber,
                    password: hashedPassword,
                    className,
                    name
                });
                await newUser.save().then((data, err) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    else {
                        sendEmail(email, user.password);
                    }
                });

            }
            res.status(201).json({ message: 'Signup successful' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }

    }

    async sendMail(req, res) {
        let info = req.body.info;
        // console.log(info);
        // console.log(req.body);
        const email = info.email;
        const password = info.password;
        const status = await sendEmail(email, password);
        if (status) {
            res.json({ status: true });
        }
    }

    async verify(req, res) {

        try {
            const {
                otp
            } = req.body;
            //    console.log(otp);
            if (Number(otp) === otpGlobal) {
                res.json({ status: true, message: "success" });
            }
            else {
                res.status(500).json({ error: 'Invalid OTP' });
            }
            // Check if email already exists in the database

        } catch (error) {
            // If there's an error, handle it here
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async postSignIn(req, res) {
        const { identifier, userPassword } = req.body;

        try {
            // console.log(identifier, userPassword);
            const MAIL = process.env.DEFAULT_MAIL;
            const PASS = process.env.DEFAULT_PASS;
            if (MAIL == identifier && PASS == userPassword) {
                const token = jwt.sign(
                    { data: { userRole: "admin", name: "maria_dev" } },
                    JWT_SECRET
                );
                const encode = jwt.verify(token, JWT_SECRET);
                return res.json({
                    token: token,
                    data: encode.data,
                });
            }
            // console.log(req.body)
            // Check if the identifier is a valid email or mobile number
            const isEmail = /\S+@\S+\.\S+/.test(identifier); // Check if it matches email format
            const isMobileNumber = /^\d{10}$/.test(identifier); // Check if it's a 10-digit number

            if (!isEmail && !isMobileNumber) {
                return res.status(400).json({ message: "Invalid identifier. Please provide a valid email or mobile number." });
            }

            // Find the user using email or mobileNumber based on the identifier
            const user = await userModel.findOne({
                $or: [
                    isEmail ? { email: identifier } : { mobileNumber: identifier },
                ],
            });

            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            const isPasswordValid = await bcrypt.compare(userPassword, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password." });
            }

            const { password, __v, ...data } = user._doc;
            const token = jwt.sign({ data }, JWT_SECRET);

            res.status(200).json({ token, data });
        } catch (error) {
            console.error("Sign-in error:", error);
            res.status(500).json({ message: "An error occurred while signing in." });
        }
    }

    async getUser(req, res) {
        let { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: "UserId Not Provided."
            });
        } else {
            try {
                let User = await userModel.findById(userId)
                if (User) {
                    const { password, __v, ...data } = User._doc;
                    return res.status(200).json({
                        success: true,
                        user: data
                    });
                } else {
                    return res.status(404).json({
                        success: false,
                        error: "User Not Found."
                    });
                }
            } catch (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    error: "Internal Server Error: "
                });
            }
        }
    }

    async deleteUser(req, res) {
        const { userId } = req.params;

        try {
            const deletedUser = await userModel.findOneAndDelete({ _id: userId });
            // console.log(deletedUser);
            if (deletedUser) {
                return res.status(200).json({
                    success: true,
                    message: "User deleted.",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    error: "User not Found.",
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Internal Server Error: "
            });
        }
    }

    async getAllUsers(req, res) {
        try {
            // Find all users but exclude the "password" field
            const users = await userModel.find({}, { password: 0 });

            res.status(200).json({ users });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "An error occurred while fetching users." });
        }
    }

    async forgotPassword(req, res) {
        const { email, mobileNumber } = req.body;

        try {
            // Check if the user exists in the database
            const user = await userModel.findOne({ email, mobileNumber });

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Generate and save a new password for the user (you may want to send a reset link via email instead)
            const newPassword = generateRandomPassword(); // Implement your random password generation logic
            user.password = newPassword;
            await user.save();

            res.json({ message: 'Password reset successful. Check your email for the new password.' });
        } catch (error) {
            res.status(500).json({ error: 'Error resetting password.' });
        }
    }

    async makeAdmin(req, res) {
        const { id } = req.params;
        //  console.log(id);
        try {
            const user = await userModel.findById({ _id: id });
            if (!user) {
                res.json({ error: "User Not found" });
            }

            if (user.userRole === "admin") {
                user.userRole = "student"
                await user.save();
            }
            else if (user.userRole === "student") {
                user.userRole = "admin"
                await user.save();
            }
            // console.log(user);
            return res.json("role updated successfully");
        }
        catch (err) {
            console.log(err);
            res.json({ "error": err });
        }
    }


}

const usersController = new User();
module.exports = usersController;
