const express = require('express');
const dotenv = require('dotenv');
const helmet = require("helmet");
const compression = require('compression');
const colors = require('colors'); // customise consoleLog with colors for easy debugging

const app = express();
app.use(helmet()); // routes protection
app.use(compression());

const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db"); // move db to config for expanding model

const fileUpload = require('express-fileupload'); // upload file to server
app.use(fileUpload());

const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");


dotenv.config();
connectDB(); // connection call has to be after .env

//Port Connection
const port = process.env.PORT || 5000

//Middleware
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))


app.get('/api', (req, res, next) => {
  res.send("TDOG Api is running"); // TESTED -> WORKED
  console.log('this is root'.green.bold);
});

app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);


//Listening Port
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