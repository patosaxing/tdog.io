//Express and Cors import statement
import express from 'express';
import cors from 'cors';

//Mongoose import
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

//Port Connection
const port = process.env.PORT || 3000

//Middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//DATABASE
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



app.get('/', (req, res) => {
  console.log('this is root');
});

//Listening Port
app.listen(port, () =>
{
  console.log(`Application listening at http://localhost:${port}`)
})