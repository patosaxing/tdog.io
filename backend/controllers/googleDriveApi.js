const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require("dotenv").config();

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
exports.uploadFile= async(fileN) => {
  console.log('file name in G-uploader', fileN);
  const filePath = path.join(`${__dirname}/uploads/`, fileN);
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileN, //This can be name of your choice
        mimeType: 'image/jpg', // to be changed for video
      },
      media: {
        mimeType: 'image/jpg', // to be changed for video
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
    console.log(response.data.id);
  } catch (error) {
    console.log(error.message);
  }
}


// Deleting
exports.deleteFile = async (googleFileId)=> {
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
exports.generatePublicUrl= async (googleFileId)=> {
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

