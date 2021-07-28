const express = require("express");

const router = express.Router();
const videoControl = require("../controllers/videoControl");
// const { uploadToG, deleteFileOnG, generatePublicUrl } = require('../controllers/googleDriveApi');


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


const googleUpload = async (fileN) => {

  const filePathTwo = path.join(__dirname, "../uploads", fileN);

  try {
    console.log('googleCloudAPI started');
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
    // const uploadedID = response.data.id;
    // res.send(JSON.stringify(uploadedID));
    console.log('response from google drive ⮯⮯⮯'.blue, response.data);
    console.log('File uploaded with database ID'.green, response.data.id.bgGreen);

  } catch (error) {
    console.log('error from google Drive API', error.message);
  }
};

router.post("/upload", (req, res) => {
  console.log("this is inside the video route");

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  const fileN = file.name;
  console.log('file from req', file);
  console.log('file name from req', file.name);
  const filePath = path.join(__dirname, "../uploads", file.name);
  console.log('path of file', filePath);
  file.mv(filePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });



    //  send file from server to google cloud
    googleUpload(fileN);


    // delete file from server after sending to cloud


    //   setTimeout(() => {
    //     videoControl.delServerFile(filePath);
    //   }, 1500);
  })
});


module.exports = router;