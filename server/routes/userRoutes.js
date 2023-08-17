const express = require("express");
const router = express.Router();
const usersController = require("../controller/userController");
const { isAdmin, verifyToken, isNotUser } = require("../middleware/auth")
const multer = require('multer');
const upload = multer();

//Sign Up New User 
router.post("/signup", isAdmin, usersController.postSignup);


// http://localhost:3000/api/user/excelupload/signup
router.post("/excelupload/signup", upload.single('excelFile'), usersController.bulkUpload);


router.post('/sendMail/', usersController.sendMail);

// Verifying User
// router.post('/verify', usersController.verify);

//Sign In New User 
router.post("/signin", usersController.postSignIn);

//Get User
router.get("/byid/:userId", isAdmin, usersController.getUser)

//Delete User
router.delete("/byid/:userId", isAdmin, usersController.deleteUser)

//Get All Users
router.get("/getall", isAdmin, usersController.getAllUsers)

// forgotPassword
router.post('/forgotPassword', usersController.forgotPassword);


// http://localhost:3000/api/user/makeAdmin/:id
router.put('/makeAdmin/:id', isAdmin, usersController.makeAdmin);

module.exports = router;
