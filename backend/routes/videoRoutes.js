const express = require("express");
const router = express.Router();
const videoControl = require("../controllers/videoControl");
const { uploadToG } = require("../controllers/googleDriveApi");
const path = require('path');
const fs = require('fs');


// File uploading route
router.post("/upload", async (req, res,) => {
  console.log('req.body from the frontend:', req.body);
  const file = req.files.file;
  const fileN = file.name;
  const filePath = path.join(__dirname, "../uploads", file.name);
  const videoOwner = req.body.userID // how do I access the req from here???🟥;
  console.log('userID from frontend'.red, videoOwner.green);
  const qCat = req.body.category;
  console.log('Category from frontend'.red, qCat);
  const qSkill = req.body.Skill;
  console.log('Skill from frontend'.red, qSkill);

  await file.mv(filePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    } else {
      uploadToG(fileN, videoOwner, qCat, qSkill); // send file from server to google drive then save detail to MongoDB
    }
  });


  res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });

  // delete file from server after sending to cloud
  setTimeout(() => {
    videoControl.delServerFile(filePath);
  }, 3500);
});

module.exports = router;