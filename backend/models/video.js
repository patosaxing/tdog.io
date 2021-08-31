const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    category: { type: String, required: false },
    rating: { type: Number, required: false },
    comment: { type: String, required: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'user',
    },
    reviewer: { type: String, required: false}
  },
  {
    timestamps: true, // record the time for submit review
  }
);

const videoSchema = mongoose.Schema(
  {
    user: {  // to log video's owner
      type: mongoose.Schema.Types.Mixed,
      required: true,
      ref: 'User',
    },
    category: { // pulling from question catergory
      type: String,
      required: false,
    },
    videoLink: { // this is video link from Google drive
      type: String,
      required: true,
    },
    videoID: { // this is video ID from Google dive
      type: String,
      required: true,
    },
    userNote: { // user can put remark such as "EvolveU only"
      type: String,
      required: false,
    },
    description: { // pulling from question detail
      type: String,
      required: false,
    },
    reviews: [reviewSchema], // pulling from above
    rating: {
      type: Number,
      required: false,
      default: 2.5,
    },
    numReviews: { // total number reviews submitted by loggedin user
      type: Number,
      required: false,
      default: 0,
    },
    freemium: {
      type: Number,
      required: false, // will set this to true when this is live
      default: 0,
    },
    totalLikes: { // total number of Like clicked
      type: Number,
      required: false,
      default: 0,
    },
    sharePublic: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;