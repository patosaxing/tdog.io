//Express and Cors import statement
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db"); // move db to config for expanding model

const dotenv = require('dotenv');

const userRouter = require("./routes/userRoutes")

dotenv.config();
connectDB(); // connection call has to be after .env

//Port Connection
const port = process.env.PORT || 5000

//Middleware
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use('/api', userRouter)

app.get('/api', (req, res, next) => {
  res.send("TDOG Api is running"); // TESTED -> WORKED
  console.log('this is root');
});

//Listening Port
const server = app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1)); // close server to prevent extra loading/detail
});