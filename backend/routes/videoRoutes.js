const express = require("express");
const router = express.Router();
// const videoControl = require("../controllers/videoControl");
// const { uploadToG } = require("../controllers/googleDriveApi");
// const path = require('path');
// const fs = require('fs');
const createVideo = require('../controllers/videoControl');


// File uploading route
router.post("/", createVideo) 

module.exports = router;