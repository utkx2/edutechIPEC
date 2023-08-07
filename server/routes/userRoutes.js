const express = require("express");
const router = express.Router();
const usersController = require("../controller/userController");
const { isAdmin, verifyToken, isNotUser } = require("../middleware/auth")


//Sign Up New User 
router.post("/signup", usersController.postSignup);

router.post('/sendMail/:userEmail', usersController.sendMail);

// Verifying User
router.post('/verify', usersController.verify);

//Sign In New User 
router.post("/signin", usersController.postSignIn);

//Get User
router.get("/byid/:userId", usersController.getUser)

//Delete User
router.delete("/byid/:userId", usersController.deleteUser)

//Get All Users
router.get("/getall", usersController.getAllUsers)

// forgotPassword
router.post('/forgotPassword', usersController.forgotPassword);

module.exports = router;
