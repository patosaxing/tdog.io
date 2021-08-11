const express = require('express');
const dotenv = require('dotenv');
const helmet = require("helmet");
const compression = require('compression');
const colors = require('colors'); // customise consoleLog with colors for easy debugging
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db"); // move db to config for expanding model
const fileUpload = require('express-fileupload'); // upload file to server
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");

//Middleware
app.use(cors());
app.use(express.json({ limit: '20mb', extended: true }));  // limit file size for profile img upload
app.use(express.urlencoded({ limit: '20mb', extended: true }));  // limit file size for profile img upload
app.use(helmet()); // routes protection
app.use(compression());
app.use(fileUpload());
app.use(cookieParser())

dotenv.config();
connectDB(); // connection call has to be after .env

app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);



// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
  // app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
    // const index = path.join(__dirname, 'build','index.html');
    // res.sendFile(index);
  })
} else {
  app.get('/', (req, res) => {
    res.send('App is running at ROOT');
  })
}
// res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))

// app.get('*', function (req, res) {
//   const index = path.join(__dirname, 'build', 'index.html');
//   res.sendFile(index);

//Port Connection
const port = process.env.PORT || 5000

// Listening Port
app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`.blue)
});

// const server = app.listen(port, () => {
//   console.log(`Application listening at http://localhost:${port}`.yellow)
// });

// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Logged Error from listening port: ${err}`.magenta);
//   server.close(() => process.exit(1)); // close server to prevent extra loading/detail
// });