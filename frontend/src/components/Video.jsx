import React from "react";
import { Card } from "react-bootstrap";
// import SampleVideo from './R.png'
import Rating from "./Rating";
import VideoUpload from "../img/VideoUpload.svg";

const Video = ({ video }) => {
  return (
    <Card className="my-3 p-3">
      {/* <a href={`/video/${video._id}`}>
        <Card.Img src={video.image} variant='top' />
      </a> */}

      <Card.Body>
        
          <Card.Title as="div">
            <strong>{video.user}</strong>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{video.description}</Card.Subtitle>
        
        <a href={video.videoLink}>
          {/* <a href={`/video/${video._id}`}> */}
          <div style={{ width: 66, height: "auto" }}>
            <Card.Img src={VideoUpload} />
          </div>
        </a>
        <Card.Text as="div">
          Rating:
          <Rating value={video.rating} text={``} />
          {/* <Rating value={video.rating} text={``} /> */}
        </Card.Text>

        <Card.Text as="h6">Total {video.numReviews} reviews</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Video;
