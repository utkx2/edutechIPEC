const userModel = require("../models/userModel");
const { generateUUID } = require("../config/functions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
require('dotenv').config();

class User {

    async postSignup(req, res) {

        try {
            const {
                email,
                mobileNumber,
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

            //Create a uuId for userId
            const userId = generateUUID();

            // Create a new user document based on the UserModel
            const newUser = new userModel({
                ...userData,
                userId,
                email,
                mobileNumber,
                password: hashedPassword,
            });

            // Save the new user to the database
            await newUser.save().then((data) => {
                const { password, __v, ...user } = data._doc;
                const token = jwt.sign({ user }, JWT_SECRET);

                return res.status(200).json({
                    success: true,
                    token: token,
                    user: user
                });
            }).catch((err) => {
                console.log(err);
            });

        } catch (error) {
            // If there's an error, handle it here
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async postSignIn(req, res) {
        const { identifier, userPassword } = req.body;

        try {
            const MAIL = process.env.DEFAULT_MAIL;
            const PASS = process.env.DEFAULT_PASS;
            if (MAIL == identifier && PASS == userPassword) {
                const token = jwt.sign(
                    { data: { userId: "admin", userRole: "admin", name: "maria_dev" } },
                    JWT_SECRET
                );
                const encode = jwt.verify(token, JWT_SECRET);
                return res.json({
                    token: token,
                    data: encode.data,
                });
            }
            console.log(req.body)
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
                let User = await userModel.findOne({ userId: userId })
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
            const deletedUser = await userModel.findOneAndDelete(userId);

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

}

const usersController = new User();
module.exports = usersController;
