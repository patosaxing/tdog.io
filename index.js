import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.listen(3000, (req, res) => {
  console.log('swrver running  at 3000');
})

app.get('/', (req, res) => {
  console.log('this is root');
});

//  Vimeo API from the SDK

let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo("{c092d1b416b77b77fda26acd87bb603ec1f4be09}", "{5xYj7OU8U8bXQqmz4L5KsnugLn2TKSUwgXZMGeqyQQ1Ja1tpNbT6Ec4BfhkvON8cQklNNT8L0s0vk5TBWRyKhZC8SdTI/EuP4OSgBHzSvpiUN3crrrlhYThsgFgQtPjB}", "{11afc0832f4d1639079d062ca80ef875}");

client.request({
  method: 'GET',
  path: '/tutorial'
}, function (error, body, status_code, headers) {
  if (error) {
    console.log(error);
  }

  console.log(body);
})
