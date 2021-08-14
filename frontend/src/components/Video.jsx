import React, { useState } from "react";
import { Card, Modal, Button, Offcanvas } from "react-bootstrap";
// import SampleVideo from './R.png'
import Rating from "./Rating";
import VideoUpload from "../img/VideoUpload.svg";

const Video = ({ video }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [isOpen, setOpen] = useState(false);

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
        <Button variant="primary" onClick={handleShow}>
          Play video
        </Button>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{video.user}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <video width="320" height="240" controls>
              <source src={video.videoLink} type="video/webm"></source>
              Your browser does not support the video tag.
            </video>
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
