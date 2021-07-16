const express = require('express');
const fileUpload = require('express-fileupload'); // upload file to server
const app = express();
app.use(fileUpload());
const fs = require('fs/promises');
const { unlink } = require('fs/promises');

const uploadFiletoServer = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const UploadingFile = req.files.file
  // const UploadingFileName = UploadingFile.name;
  console.log('new file in server is: '.red, UploadingFile.name); //this will be fed into G-cloud API

  await UploadingFile.mv(`${__dirname}/uploads/${UploadingFile.name}`, err => {
      if (err) {
      console.error(err);
      return res.status(500).send(err); //server error
    }
    res.json({ fileName: UploadingFileName, filePath: `/uploads/${UploadingFileName}` });
  });
  // push file from server to google drive
  uploadFile(UploadingFileName);
};

exports.delServerFile = async(fPath)=>{
  try {
    await unlink(fPath);
    console.log(`successfully deleted ${fPath}`.bgBlue);
  } catch (error) {
    console.error('there was an error:', error.message);
  }
};

