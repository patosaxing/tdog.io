import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Video from "../components/Video";
import Questions from "../components/Questions";
import WebcamStreamCapture from "../components/WebStreamCapture";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import Paginate from "../components/Paginate";
// import Meta from "../components/Meta";
import { listPublicVideos } from "../actions/videoActions";
import TypeAnimation from "react-type-animation";

// const PrivateScreen = ({ match }) => {
const PrivateScreen = () => {
  // const userLogin = useSelector((state) => state.userLogin);
  // const keyword = match.params.keyword;
  // const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const publicVideos = useSelector((state) => state.publicVideos);
  const { loading, error, videos } = publicVideos;

  const videoReviewCreate = useSelector((state) => state.videoReviewCreate);
  const { success: successVideoReview, error: errorVideoReview } =
    videoReviewCreate;

  useEffect(() => {
    dispatch(listPublicVideos());
  }, [dispatch, successVideoReview]);

 
  // const { userInfo } = userLogin;
  return (
    <div>
        <h6 style={{ color: "transparent" }}>Header spacer</h6>
      {/* <Meta />
      {!keyword ? (
        <h1> PUBLICK VIDEOS HERE </h1>
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )} */}
      <div>
        <div style={{ display: "flex" }}>
          <ProfileCard />
          <div>
            <Questions />
            <WebcamStreamCapture />
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="my-5">
            <TypeAnimation
              cursor={true}
              sequence={[
                "Record, pratice interview in a safe environment",
                2000,
                "Get feedback, reviews and advice from peers and professionals",
                2000,
                "Boost your confidence to help you ace your job interviews.",
                2000,
              ]}
              wrapper="h2"
              repeat={Infinity}
            />
            <Row>
              {videos.map((video) => (
                <Col key={video.videoID} sm={12} md={6} lg={4} xl={3}>
                  <Video video={video} />
                </Col>
              ))}
            </Row>
            {/* <Paginate
              pages={pages}
              page={page}
              // keyword={keyword ? keyword : ""}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateScreen;
