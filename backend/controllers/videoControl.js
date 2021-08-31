const fs = require('fs/promises'); // use NodeJS to delete server file
const { unlink } = require('fs/promises');
const Video = require('../models/video');
const { uploadToG, deleteFileOnG, generatePublicUrl } = require('./googleDriveApi');
const path = require('path');
const asyncHandler = require('express-async-handler');
const JWTdecoder = require('../middleware/JWTdecoder');
const { ObjectId } = require('mongodb');
const ratingRange = [3, 3.5, 4, 4.5, 5]
const fakeRating = ratingRange[(Math.random() * ratingRange.length) | 0];

// @desc    Callback function to delete file in backend server after gDrive
const delServerFile = async (fPath) => {
  try {
    await unlink(fPath);
    // console.log(`successfully deleted ${fPath}`.bgBlue);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
};


// @desc    Callback function  to create a video record in MongoDB
const videoDetailToMongo = async (id, url, videoOwner, qCat, qSkill, sharePublic, userNote) => {
  const videoDetail = new Video({
    user: videoOwner,
    category: qCat || '❗notFound',
    videoLink: url,
    videoID: id,
    userNote,
    sharePublic,
    description: qSkill || '❗notFound',
    reviews: [],
    rating: fakeRating,
    numReviews: 1,
  });
  const createdVideo = await videoDetail.save();
  // console.log('fromMongoDB', createdVideo);
  // res.status(201).json(createdVideo);
  return createdVideo;
};


// @desc    Upload to gDrive and Create a video record in MongoDB
// @route   POST /api/videos
const createVideo = async (req, res) => {
  // console.log('req.body from the frontend:', req.body);
  const file = req.files.file;
  const fileN = file.name;
  const filePath = path.join(__dirname, "../uploads", file.name);
  const videoOwner = req.body.userID
  // console.log('userID from frontend'.red, videoOwner.green);
  const qCat = req.body.category;
  const sharePublic = req.body.sharePublic;
  const userNote = req.body.userNote;
  // console.log('Category from frontend'.red, qCat);
  const qSkill = req.body.Skill;
  // console.log('Skill from frontend'.red, qSkill);

  // upload file to server
  const fileUpload = async () => {
    // console.log('testing to see if it called');
    const fileResult = await (
      new Promise((resolve, reject) => {
        file.mv(filePath, async err => {
          if (err) {
            console.error(err);
            reject(res.status(500).send(err));
          } else {
            // send file from server to google drive 
            const googleRes = await uploadToG(fileN);
            // console.log('id from uploadtoG'.blue, googleRes);
            // console.log('url from uploadtoG', url);
            resolve(googleRes);
          }
        })
      }));
    // console.log('***********result is :'.green, fileResult);
    return fileResult;



  };
  const result = await fileUpload();
  // console.log('reuslt id'.green, result);
  const { id, url } = result;
  // Create a video record in MongoDB collection
  const videoRecord = await videoDetailToMongo(id, url, videoOwner, qCat, qSkill, sharePublic, userNote);

  // delete file in server after successful upload
  delServerFile(filePath);
  res.status(201).json(videoRecord);
}

// @desc    Get logged in user videos
// @route   GET /api/videos/myvideos

const getMyVideos = async (req, res) => {
  const userDetail = JWTdecoder(req.headers.authorization);
  // console.log('userID from getMyVideos'.bgRed, userDetail.id);
  const videos = await Video.find({ user: userDetail.id });
  // const videos = await Video.find({ user: ObjectId(`${userDetail.id}`) }); // condition will be set here for myVideos only
  // console.log('videos AFTER "VIdeo.Find()"', videos);
  res.json(videos);

};


// @desc    Get all videos by 'sharePublic:true'
// @route   GET /api/videos/publicvideos
const getPublicVideos = async (req, res) => {
  const userDetail = JWTdecoder(req.headers.authorization);
  // console.log('line109'.bgBlue, userDetail);
  // const videos = await Video.find({ user: req.userInfo._id });
  // const videos = await Video.find({ sharePublic: true });
  const videos = await Video.find({ sharePublic: true }).populate('user', 'username');
  // const usernameInVideo = await Video.populate('user');
  // console.log('total videos from controller: '.bgYellow.red, videos.length)
  res.json(videos);

};

// @desc    Create new review
// @route   POST /api/videos/:id/reviews

const createVideoReview = asyncHandler(async (req, res) => {
  const { rating, comment, videoId } = req.body;
  // console.log('body of createVideoReview'.bgGreen, req.body);
  // const video = await Video.findById(req.params.id);
  const video = await Video.findById(videoId);
  // console.log('video from model.find in the controller'.red, video);

  if (video) {
    // const alreadyReviewed = video.reviews.find(
    //   (r) => r.user.toString() === req.user._id.toString()
    // );

    // if (alreadyReviewed) {
    //   res.status(400);
    //   throw new Error('Video already reviewed');
    // }

    const review = {
      name: req.username,
      rating: Number(rating),
      comment,
      // user: req.user._id,
    };

    // console.log('review obj from copntroller'.bgCyan, review);
    video.reviews.push(review);

    video.numReviews = video.reviews.length;

    video.rating =
      video.reviews.reduce((acc, item) => item.rating + acc, 0) /
      video.reviews.length;

    await video.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Video not found');
  }
});



// @desc    Fetch single video
// @route   GET /api/videos/:id
const getVideoById = asyncHandler(async (req, res) => {
  // console.log('req from getVideoById'.yellow,req.headers);
  const video = await Video.findById(req.params.id);

  if (video) {
    res.json(video);
  } else {
    res.status(404);
    throw new Error('Video not found');
  }
});

// @desc    Delete a video
// @route   DELETE /api/videos/:id

const deleteVideoById = asyncHandler(async (req, res) => {
  const delID = req.params.id;
  const video = await Video.findById(delID);
  console.log('ID from pramas', video.videoID);
  if (video) {
    await video.remove();
    await deleteFileOnG(video.videoID);
    res.json({ message: 'Video removed' });
  } else {
    res.status(404);
    throw new Error('Video not found');
  }
});

// @desc    Update a video
// @route   PUT /api/videos/:id

const updateVideo = asyncHandler(async (req, res) => {
  const {
    category,
    userNote,
    description,
    sharePublic,
  } = req.body;

  const video = await Video.findById(req.params.id);

  if (video) {
    video.category = category;
    video.userNote = userNote;
    video.description = description;
    video.sharePublic = sharePublic;

    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } else {
    res.status(404);
    throw new Error('Video not found');
  }
});

const likeVideo = async (req, res) => {
  const { id } = req.params;
  console.log('Param from LikeVideo controller'.red, req.params);
  // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Video with id: ${id}`);
  
  const video = await Video.findById(id);

  const updatedVideo = await Video.findByIdAndUpdate(id, { totalLikes: video.totalLikes + 1 }, { new: true });
  
  res.json(updatedVideo);
}

module.exports = { createVideo, getMyVideos, getPublicVideos, createVideoReview, getVideoById, deleteVideoById, updateVideo, likeVideo };