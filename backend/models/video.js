const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  {
    timestamps: true, // record the time for submit review
  }
);

const videoSchema = mongoose.Schema(
  {
    user: {  // to log video's owner
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    category: {
      type: String,
      required: true,
    },
    videoLink: { // this is video link from Google cloud provider
      type: String,
      required: true,
    },
    userNote: { // user can put remark such as "EvolveU only"
      type: String,
      required: true,
    },
    category: { // pulling from question catergory
      type: String,
      required: true,
    },
    description: { // pulling from question detail
      type: String,
      required: true,
    },
    reviews: [reviewSchema], // pulling from above
    rating: {
      type: Number,
      required: true,
      default: 0.5,
    },
    numReviews: { // total number reviews submitted by loggedin user
      type: Number,
      required: true,
      default: 0,
    },
    freemium: {
      type: Number,
      required: false, // will set this to true when this is live
      default: 0,
    },
    numberViews: { // total number of times viewed
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', videoSchema);

export default Video;