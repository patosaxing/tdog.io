const express = require("express");
const router = express.Router();
const { getMyVideos, createVideo, getPublicVideos, createVideoReview } = require('../controllers/videoControl');
const protect = require('../middleware/auth')

// do we need to bring auth.protect in here for token security??


router.get("/myvideos", getMyVideos);
router.get("/publicvideos", getPublicVideos);
router.post("/", createVideo);
router.route('/:id/reviews').post(createVideoReview);


module.exports = router;