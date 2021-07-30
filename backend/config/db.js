//DATABASE
const mongoose = require("mongoose");
require("dotenv").config();

//Database credentials // added async to hanlde promises
const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
};
//Database connection
const db = mongoose.connection;
db.once("open", (_) => console.log("TDOGdb is now connected".bgBlue));
db.on("error", (err) => console.error("TDOGdb connection error!", err))

module.exports = connectDB;