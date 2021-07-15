const express = require('express');
const dotenv = require('dotenv');
const helmet = require("helmet");
const compression = require('compression');
const colors = require('colors'); // customise consoleLog with colors for easy debugging
const app = express();
app.use(helmet());
app.use(compression());
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db"); // move db to config for expanding model
const fileUpload = require('express-fileupload'); // upload file to server
const { uploadFile, deleteFile, generatePublicUrl } = require('./controllers/googleDriveApi')


const userRoutes = require("./routes/userRoutes")

dotenv.config();
connectDB(); // connection call has to be after .env

//Port Connection
const port = process.env.PORT || 5000

//Middleware
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use(fileUpload());

app.use('/', userRoutes)

app.get('/api', (req, res, next) => {
  res.send("TDOG Api is running"); // TESTED -> WORKED
  console.log('this is root'.green.bold);
});

// Upload endpoint
app.post('/api/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const UploadingFile = req.files.file
  const UploadingFileName = UploadingFile.name;
  console.log('name of the file is: ', UploadingFileName); //this will be fed into G-cloud API

  UploadingFile.mv(`${__dirname}/uploads/${UploadingFileName}`, err => {
    // file.mv(`${__dirname}/../frontend/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err); //server error
    }
    res.json({ fileName: UploadingFileName, filePath: `/uploads/${UploadingFileName}` });
  });
  uploadFile(UploadingFileName);
});

//Listening Port
const server = app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`.yellow.bold)
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`.red.bold);
  server.close(() => process.exit(1)); // close server to prevent extra loading/detail
});