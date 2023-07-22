const express = require('express');
const router = express.Router();
const aboutController = require('../controller/adoutController');

//Enter details
router.post('/upload', aboutController.upload);

//Edit details
router.put('/edit', aboutController.edit);

//Get all details
router.get("/get", aboutController.getAll);

//Delete details
router.delete("/remove", aboutController.remove);

module.exports = router;
