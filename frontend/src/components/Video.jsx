import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
// import SampleVideo from './R.png'
import Rating from "./Rating";
import VideoUpload from "../img/VideoUpload.svg";

const Video = ({ video }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isOpen, setOpen] = useState(false);

  return (
    <Card className="my-3 p-3">
      {/* <a href={`/video/${video._id}`}>
        <Card.Img src={video.image} variant='top' />
      </a> */}

      <Card.Body>
        <Card.Title as="div">
          <strong>{video.user}</strong>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {video.description}
        </Card.Subtitle>
        {/* Offcanvas Start */}
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas1"
          aria-controls="offcanvasExample"
        >
          Open
        </button>
        <div class="offcanvas offcanvas-start" tabindex="-1" id={video.videoId}>
          <div class="offcanvas-header">
            <h5 class="offcanvas-title"> {video.description}</h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <video src="https://drive.google.com/file/d/1WOHcQBa0ZDTRjKfXX0sH_-HkRwQVQTCZ/view?usp=drivesdk" width="320" height="240" controls>
              
            </video>
          </div>
        </div>
        {/* Offcanvas End */}
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
