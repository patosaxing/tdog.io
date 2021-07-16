const express = require("express");
const router = express.Router();
const videoControl = require("../controllers/videoControl");

router.post("/api/videos/upload", videoControl.uploadFiletoServer); 


module.exports = router;