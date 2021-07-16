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


// Uploadiing
exports.uploadFile = async (fileN) => {
  console.log('file name in G-uploader', fileN.green.bold);
  const filePath = path.join(`${__dirname}/../uploads/`, fileN);
  console.log('path of the file to be pushed to G-drive'.red, filePath.yellow);
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileN, //This can be changed
        mimeType: 'video/webm', // to be changed for video
      },
      media: {
        mimeType: 'video/webm', // to be changed for video
        body: fs.createReadStream(filePath),
      },
    });
    const uploadedID = response.data.id
    console.log('response from google drive ⮯⮯⮯'.blue, response.data);
    console.log('File uploaded with database ID'.green, response.data.id.bgGreen);
  } catch (error) {
    console.log('error from google Drive API', error.message);
  }
}

// Deleting
exports.deleteFile = async (googleFileId) => {
  try {
    const response = await drive.files.delete({
      fileId: googleFileId,
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

// GetExternalURL
exports.generatePublicUrl = async (googleFileId) => {
  try {

    await drive.permissions.create({
      fileId: googleFileId,
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
      fileId: googleFileId,
      fields: 'webViewLink, webContentLink',
    });
    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
}

