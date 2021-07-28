import { Vimeo } from 'vimeo';

//  Vimeo API from the SDK

let client = new Vimeo("c092d1b416b77b77fda26acd87bb603ec1f4be09", "5xYj7OU8U8bXQqmz4L5KsnugLn2TKSUwgXZMGeqyQQ1Ja1tpNbT6Ec4BfhkvON8cQklNNT8L0s0vk5TBWRyKhZC8SdTI/EuP4OSgBHzSvpiUN3crrrlhYThsgFgQtPjB", "5ff8513a276b8f1da5f1e046f352c644");


// Upload to Vimeo
const file_name = "./uploads/Pexels.mp4"
client.upload(
  file_name,
  {
    'name': 'sample',
    'description': 'The description goes here.'
  },
  function (uri) {
    console.log('Your video yyyyy URI is: ' + uri);
  },
  function (bytes_uploaded, bytes_total) {
    var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
    console.log(bytes_uploaded, bytes_total, percentage + '%')
  },
  function (error) {
    console.log('Failed because: ' + error)
  }
);