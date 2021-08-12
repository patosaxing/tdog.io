import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Video from "../components/Video";
import { Link } from "react-router-dom";
import QuestionSelection from "../components/Questions";
import WebcamStreamCapture from "../components/WebStreamCapture";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Meta from '../components/Meta';

const PrivateScreen = ({ match }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const publicVideos = useSelector((state) => state.publicVideos);
  const { loading, error, videos, page, pages } = publicVideos;

  useEffect(() => {
    dispatch(publicVideos(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // const { userInfo } = userLogin;
  return (
    <div>
      <Meta />
      {!keyword ? (
        <h1> PUBLICK VIDEOS HERE </h1>
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <div>
        <div style={{ display: "flex" }}>
          <ProfileCard />
          <WebcamStreamCapture />
          <QuestionSelection />
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <h1>Public Video list here</h1>
            <Row>
              {videos.map((video) => (
                <Col key={video._id} sm={12} md={6} lg={4} xl={3}>
                  <Video video={video} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              // keyword={keyword ? keyword : ""}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateScreen;
