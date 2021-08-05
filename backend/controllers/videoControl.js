const fs = require('fs/promises'); // use NodeJS to delete server file
const { unlink } = require('fs/promises');
const Video = require('../models/video');
const { uploadToG, deleteFileOnG, generatePublicUrl } = require('./googleDriveApi');
const path = require('path');


// @desc    Callback function to delete file in backend server after gDrive
const delServerFile = async (fPath) => {
  try {
    await unlink(fPath);
    console.log(`successfully deleted ${fPath}`.bgBlue);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
};


// @desc    Callback function  to create a video record in MongoDB
const videoDetailToMongo = async (id, url, videoOwner, qCat, qSkill) => {
  const videoDetail = new Video({
    user: videoOwner,
    category: qCat || '❗notFound',
    videoLink: url,
    videoID: id,
    userNote: '',
    description: qSkill || '❗notFound',
    reviews: [],
    ratings: 3.5,
    numReviews: 100,
  });
  const createdVideo = await videoDetail.save();
  // res.status(201).json(createdVideo);
  console.log('fromMongoDB', createdVideo);
};


// @desc    Upload to gDrive and Create a video record in MongoDB
// @route   POST /api/videos
const createVideo = async (req, res) => {
  console.log('req.body from the frontend:', req.body);
  const file = req.files.file;
  const fileN = file.name;
  const filePath = path.join(__dirname, "../uploads", file.name);
  const videoOwner = req.body.userID
  console.log('userID from frontend'.red, videoOwner.green);
  const qCat = req.body.category;
  console.log('Category from frontend'.red, qCat);
  const qSkill = req.body.Skill;
  console.log('Skill from frontend'.red, qSkill);

  // upload file to server
  await file.mv(filePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  // send file from server to google drive 
  const { id, url } = await uploadToG(fileN);

  console.log('id from uploadtoG', id);
  console.log('url from uploadtoG', url);

  // Create a video record in MongoDB collection
  videoDetailToMongo(id, url, videoOwner, qCat, qSkill);


  delServerFile(filePath);

};




module.exports = createVideo;