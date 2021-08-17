import React, { useState, useEffect } from "react";
import { Card, Button, Offcanvas, Col, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Message from "../components/Message";
import { listPublicVideos, createVideoReview } from "../actions/videoActions";
import { VIDEO_CREATE_REVIEW_RESET } from "../constants/videoConstants";

const SampleVideo = ({video}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <Card className="my-3 p-3">
      <Card.Body>
        <Card.Title as="div">
          <strong>{video.name}</strong>
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {video.description}
        </Card.Subtitle>

        {/******************* Offcanvas Start */}
        <Button variant="secondary" onClick={handleShow}>
          View video
        </Button>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Total views: {video.view}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
           <img style={{maxHeight: "12rem"}} src={video.video} alt="preview" />
            <Rating value={video.rating} text={`${video.numReviews} reviews`} />
            <hr />
            <h6>Category: {video.category}</h6>
            <h6>Description: {video.description}</h6>
            <hr />
            <Col md={6}>
              <h5>Reviews🗊</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h6>✍Add a review: </h6>
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Offcanvas.Body>
        </Offcanvas>
        {/******************* Offcanvas End */}
        <Card.Text as="div">
          Rating: <Rating value={video.rating} text={``} />
          <Button variant="outline-secondary">
            👍
          </Button>
        </Card.Text>
        <Card.Text as="h6">Total {video.numReviews} reviews</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SampleVideo;
