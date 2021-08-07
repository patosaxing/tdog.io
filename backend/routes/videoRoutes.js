const express = require("express");
const router = express.Router();
const { getMyVideos, createVideo } = require('../controllers/videoControl');
const protect = require('../middleware/auth')

// do we need to bring auth.protect in here for token security??


router.get("/myvideos", getMyVideos);
router.post("/", createVideo);


module.exports = router;