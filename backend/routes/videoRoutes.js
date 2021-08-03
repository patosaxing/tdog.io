const express = require("express");
const router = express.Router();
const videoControl = require("../controllers/videoControl");
const {uploadToG} = require("../controllers/googleDriveApi");
const path = require('path');
const fs = require('fs');

// File uploading route
router.post("/upload", async (req, res) => {
  const file = req.files.file;
  const fileN = file.name;
  const filePath = path.join(__dirname, "../uploads", file.name);

  await file.mv(filePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    } else {
      uploadToG(fileN); // send file from server to google drive
    }
  });

  res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });

  // delete file from server after sending to cloud
  setTimeout(() => {
    videoControl.delServerFile(filePath);
  }, 3000);
});

module.exports = router;