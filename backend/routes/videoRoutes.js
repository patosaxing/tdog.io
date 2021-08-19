const express = require("express");
const router = express.Router();
const { getMyVideos, createVideo, getPublicVideos, createVideoReview, getVideoById, deleteVideoById } = require('../controllers/videoControl');
const protect = require('../middleware/auth')

// do we need to bring auth.protect in here for token security??


router.get("/myvideos", getMyVideos);
router.get("/publicvideos", getPublicVideos);
router.post("/", createVideo);
router.get('/:id', getVideoById)
router.route('/:id/reviews').post(createVideoReview);
router.delete('/:id', deleteVideoById)


module.exports = router;