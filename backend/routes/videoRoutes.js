const express = require("express");
const router = express.Router();
const createVideo = require('../controllers/videoControl');


// File uploading route
router.post("/", createVideo) 

module.exports = router;