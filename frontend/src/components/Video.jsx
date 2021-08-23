import React, { useState, useEffect } from "react";
import { Card, Button, Offcanvas, Col, Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Message from "../components/Message";
import { listPublicVideos, createVideoReview, listVideoDetails, likeVideo } from "../actions/videoActions";
import { VIDEO_CREATE_REVIEW_RESET } from "../constants/videoConstants";

const Video = ({video}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // console.log('####item in Video component',video);
  // const reviewArray = video.reviews;
  // console.log('revirw in the video',reviewArray);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const videoReviewCreate = useSelector((state) => state.videoReviewCreate);
  const { success: successVideoReview, error: errorVideoReview } =
    videoReviewCreate;

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3.5);

  const newVideoLink = `${video.videoLink}`.replace(
    "/view?usp=drivesdk",
    "/preview"
  );
  // console.log('$$$$$video before useEffect', video.video);
    //  console.log(newVideoLink);

    const dispatch = useDispatch();

  useEffect(() => {
    if (successVideoReview) {
      console.log("Review Submitted!");
      setRating(3.5);
      setComment("");
      dispatch({ type: VIDEO_CREATE_REVIEW_RESET });
      // dispatch (listVideoDetails(video._id));
      
    }
    // dispatch(listVideoDetails(video._id));
  }, [successVideoReview, dispatch, video._id]);

  // console.log('****AFTER useEffect', video);

  const submitHandler = (e) => {
    const videoId = video._id;
    e.preventDefault();
    dispatch(
      createVideoReview(video._id, {
        rating,
        comment,
        videoId,
      })
    );
    // dispatch (listPublicVideos);
    alert('Your feedback / review has been added to this Video.\n 🤝 Thank-you!')
    // setShow(false)
    // dispatch (listVideoDetails(video._id));
  };

  const handleLike = (ID) => {
    console.log('here is the id of liking video',ID);
    dispatch(likeVideo(ID))
  };

  return (
    <Card className="my-3 p-3">
      <Card.Body>
        <Card.Title as="div">
          <strong>{video.user}</strong>
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {video.description}
        </Card.Subtitle>

        {/******************* Offcanvas Start */}
        <Button variant="secondary" onClick={handleShow}>
          Play video
        </Button>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>User: {video.user}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <iframe
              title={video.user}
              src={newVideoLink}
              type="video/webm"
              width="100%"
              height="auto"
              autoPlay
              allowFullScreen
            ></iframe>
            <Rating value={video.rating} text={`${video.numReviews} reviews`} />
            <hr />
            <h6>Category: {video.category}</h6>
            <h6>Description: {video.description}</h6>
            <hr />
            <Col md={6}>
              <h5>Reviews🗊</h5>
              {video.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {video.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} text={''} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h6>✍Add a review: </h6>
                  {errorVideoReview && (
                    <Message variant="danger">{errorVideoReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating ✮</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Very Poor</option>
                          <option value="1.5">1.5 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="2.5">2.5 - Average</option>
                          <option value="3">3 - Above Average</option>
                          <option value="3.5">3.5 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="4.5">4.5 - Great</option>
                          <option value="5">5 - Excellent🎉</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment...</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Offcanvas.Body>
        </Offcanvas>
        {/******************* Offcanvas End */}
        <Card.Text as="div">
          Rating: <Rating value={video.rating} text={``} />
          <Button variant="outline-secondary" onClick={()=>handleLike(video._id)}>
            👍
          </Button>
          Total {video.totalLikes} likes
        </Card.Text>
        <Card.Text as="h6">Total {video.numReviews} reviews</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Video;
