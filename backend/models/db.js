//DATABASE
const mongoose = require("mongoose")
require("dotenv").config()

//Database credentials
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  
  //Database connection
  const db = mongoose.connection;
  db.once("open", (_) => console.log("TDOGdb is now connected:"));
  db.on("error", (err) => console.error("TDOGdb connection error!", err))

  module.exports = mongoose;