import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listVideoDetails, createVideoReview } from '../actions/videoActions';
import { VIDEO_CREATE_REVIEW_RESET } from '../constants/videoConstants';

const VideoScreen = ({ history, match }) => {
  const [totalLikes, setTotalLikes] = useState(1);
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const videoDetails = useSelector((state) => state.videoDetails);
  const { loading, error, video } = videoDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const videoReviewCreate = useSelector((state) => state.videoReviewCreate);
  const { success: successVideoReview, error: errorVideoReview, } = videoReviewCreate;

  useEffect(() => {
    if (successVideoReview) {
      alert('Review Submitted!');
      setRating(2);
      setComment('');
      dispatch({ type: VIDEO_CREATE_REVIEW_RESET });
    }
    dispatch(listVideoDetails(match.params.id));
  }, [dispatch, match, successVideoReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?totalLikes=${totalLikes}`);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createVideoReview(match.params.id, {
        rating,
        comment,
      })
    );
  }


  return (
    <>
      <h1 style={{ color: 'transparent' }}> Video screen </h1>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={video.category} />
          <Row>
            <Col md={6}>
              <Image src={video.image} alt={video.category} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>

                </ListGroup.Item>
                <h3>{video.category}</h3>
                <ListGroup.Item>
                  <Rating
                    value={video.rating}
                    text={`${video.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>freemium: ${video.freemium}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {video.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>freemium:</Col>
                      <Col>
                        <strong>${video.freemium}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {video.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {video.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>TotalLikes</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={totalLikes}
                            onChange={(e) => setTotalLikes(e.target.value)}
                          >
                            {[...Array(video.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={video.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {video.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {video.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorVideoReview && (
                    <Message variant='danger'>{errorVideoReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Very Poor</option>
                          <option value='1.5'>1.5 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='2.5'>2.5 - Average</option>
                          <option value='3'>3 - Above Average</option>
                          <option value='3.5'>3.5 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='4.5'>4.5 - Great</option>
                          <option value='5'>5 - Excellent🎉</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default VideoScreen;