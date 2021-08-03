
const fs = require('fs/promises'); // use NodeJS to delete server file
const { unlink } = require('fs/promises');
// const { uploadToG, deleteFileOnG, generatePublicUrl } = require('./googleDriveApi');
const Video = require('../models/video')
const mongoose = require('mongoose');


const videoControl = {
  delServerFile: async (fPath) => {
    try {
      await unlink(fPath);
      console.log(`successfully deleted ${fPath}`.bgBlue);
    } catch (error) {
      console.error('there was an error:', error.message);
    }
  },
  videoDetailToMongo: async (id, url) => {
    const videoDetail = new Video({
    
      category: 'Will be added',
      videoLink: url,
      videoID: id,
      userNote: '',
      description: 'testing1',
      reviews: [],
      ratings: 5,
      numReviews: 100,
    });
    const createdVideo = await videoDetail.save();
    // res.status(201).json(createdVideo);
    console.log('fromMongoDB', createdVideo);
  }
}

module.exports = videoControl;