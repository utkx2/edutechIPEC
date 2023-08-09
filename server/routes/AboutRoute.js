const express = require('express');
const router = express.Router();
const aboutController = require('../controller/adoutController');
const { verifyToken, isAdmin } = require('../middleware/auth');

//Enter details
router.post('/upload', isAdmin, aboutController.upload);

//Edit details
router.put('/edit', isAdmin, aboutController.edit);

//Get all details
//http://localhost:3000/api/
router.get("/get", aboutController.getAll);

//Delete details
router.delete("/remove", isAdmin, aboutController.remove);

module.exports = router;
