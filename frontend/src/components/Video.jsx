import React, { useState } from "react";
import { Card, Modal, Button, Offcanvas } from "react-bootstrap";
// import SampleVideo from './R.png'
import Rating from "./Rating";
import VideoUpload from "../img/VideoUpload.svg";
import PreviewVideo from "./PreviewVideo";

const Video = ({ video }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [isOpen, setOpen] = useState(false);
  const newVideoLink = `${video.videoLink}`.replace(
    "/view?usp=drivesdk",
    "/preview"
  );
  console.log(newVideoLink);
  

  return (
    <Card className="my-3 p-3">
          <Card.Body>
        <Card.Title as="div">
          <strong>{video.user}</strong>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {video.description}
        </Card.Subtitle>
        {/* Offcanvas Start */}
        <Button variant="primary" onClick={handleShow}>
          Play video
        </Button>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{video.videoLink}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          
            <iframe
              src={newVideoLink}
              type="video/webm"
              width="100%"
              height="auto"
              autoplay
              allowFullScreen
            ></iframe>
            
          </Offcanvas.Body>
        </Offcanvas>
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
