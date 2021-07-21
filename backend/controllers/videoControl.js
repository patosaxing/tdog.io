// const express = require('express');
// const fileUpload = require('express-fileupload'); // upload file to server
const fs = require('fs/promises'); // use NodeJS to delete server file
const { unlink } = require('fs/promises');
const { uploadToG, deleteFileOnG, generatePublicUrl } = require('./googleDriveApi');

// const app = express();
// app.use(fileUpload());

const videoControl = {
  uploadFiletoServer: async (req, res) => {
    console.log('req detail'.bgRed, req.files);
    let UploadingFile = req.files.file; //🅱
    console.log('file Detail before uploading'.yellow, UploadingFile);
   
    if (!UploadingFile) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const UploadingFileName = UploadingFile.name;
    // console.log('new file in server is: '.red, UploadingFileName); //this will be fed into G-cloud API

    // const UploadingFPath = `${__dirname}/uploads/${UploadingFileName}`;
    // console.log('UploadingFPatch', UploadingFPath.red);

    //callback for deleting server file after upload to server
    const delServerFile = async (fPath) => {
      try {
        await unlink(fPath);
        console.log(`successfully deleted ${fPath}`.bgBlue);
      } catch (error) {
        console.error('there was an error:', error.message);
      }
    };

    // Upload file to server
    await UploadingFile.mv(`${__dirname}/uploads/${UploadingFile.name}`, err => {
      if (err) {
        console.error(err.bgBlue);
        return res.status(500).send(err); //server error
      }
      res.json({ fileName: UploadingFileName, filePath: `/uploads/${UploadingFileName}` });
    });

    // push file from server to google drive
    uploadToG(UploadingFileName);
    delServerFile();

  },
};

module.exports = videoControl;