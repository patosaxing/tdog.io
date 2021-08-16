import React, { useState } from "react";
import { Card, Modal, Button, Offcanvas } from "react-bootstrap";
// import SampleVideo from './R.png'
import Rating from "./Rating";

const Video = ({ video }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [isOpen, setOpen] = useState(false);
  const newVideoLink = `${video.videoLink}`.replace(
    "/view?usp=drivesdk",
    "/preview"
  );
  // console.log(newVideoLink);

  const handleLike = (video) => {
    
  }

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
        <Button variant="secondary" onClick={handleShow}>
          Play video
        </Button>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Previewing Video</Offcanvas.Title>
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
            <h2>User: {video.user}</h2>
            <Rating value={video.rating} />
            <h6>Category: {video.category}</h6>
            <h6>Description: {video.description}</h6>
          </Offcanvas.Body>
        </Offcanvas>
        {/* Offcanvas End */}
        <Card.Text as="div">
          Rating:
          <Rating value={video.rating} text={``} />
          <h1>Total comments: ....</h1>
          {/* <Rating value={video.rating} text={``} /> */}
          <Button variant="secondary" onClick={handleLike}>
            👍Total Like
          </Button>
        </Card.Text>
        <Card.Text as="h6">Total {video.numReviews} reviews</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Video;
