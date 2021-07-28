const express = require("express");
const router = express.Router();
const videoControl = require("../controllers/videoControl");
const { uploadToG, deleteFileOnG, generatePublicUrl } = require('../controllers/googleDriveApi');
const path = require('path'); // good practive for using on different system


router.post("/upload", (req, res) => {
  console.log("this is inside the video route");

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
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
  });
  //  send file from server to google cloud
  uploadToG(file.name);

  // delete file from server after sending to cloud
  

  setTimeout(() => {
    videoControl.delServerFile(filePath);
  }, 1500);
});


module.exports = router;