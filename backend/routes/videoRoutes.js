const express = require("express");
const router = express.Router();
const videoControl = require("../controllers/videoControl");


// *** START of google code body
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require("dotenv").config();
const colors = require('colors');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});
// *** End of Google code body


// Upload file from backend server to Google Drive
const uploadToGoogle = async (fileN) => {
  const filePathTwo = path.join(__dirname, "../uploads", fileN);

  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileN,
        mimeType: 'video/webm', // type from webcam component
      },
      media: {
        mimeType: 'video/webm',
        body: fs.createReadStream(filePathTwo),
      },
    });
    const uploadedID = response.data.id;
   
    console.log('response from google drive ⮯⮯⮯'.blue, response.data);
    console.log('File uploaded with database ID'.green, uploadedID.bgGreen);

  } catch (error) {
    console.log('ERROR from google Drive API: ', error.message);
  }
};

// File uploading route
router.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  const fileN = file.name;
  const filePath = path.join(__dirname, "../uploads", file.name);
  
  file.mv(filePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });

    //  send file from server to google cloud
    uploadToGoogle(fileN);

    // delete file from server after sending to cloud
      setTimeout(() => {
        videoControl.delServerFile(filePath);
      }, 1500);
  })
});

module.exports = router;