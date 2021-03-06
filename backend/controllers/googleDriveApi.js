const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require("dotenv").config();
const colors = require('colors');
const videoControl = require("../controllers/videoControl");

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

// Uploadiing
exports.uploadToG = async (fileN, uploadUser, qCat, qSkill) => {

  const filePath = path.join(__dirname, "../uploads", fileN);

  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileN,
        mimeType: 'video/webm', // type from webcam component
      },
      media: {
        mimeType: 'video/webm',
        body: fs.createReadStream(filePath),
      },
    });

    // console.log('response from google drive ⮯⮯'.blue, response.data);

    const fileId = response.data.id;

    // Get the file URL from google drive
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    /* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */

    const result = await drive.files.get({
      fileId,
      fields: 'webViewLink',

    });

    // console.log('resutl from ext URL function'.magenta, result.data.webViewLink);
    return { id: response.data.id, url: result.data.webViewLink }
    

  } catch (error) {
    console.log('error from google Drive API: ', error.message);
  }
}


// Deleting
exports.deleteFileOnG = async (googleFileId) => {
  try {
    const response = await drive.files.delete({
      fileId: googleFileId,
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}
