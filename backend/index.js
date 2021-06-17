import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors());

app.listen(3000, (req, res) => {
  console.log('server running  at 3000');
})

app.get('/', (req, res) => {
  console.log('this is root');
});

