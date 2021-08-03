import React from "react";
// import { Row, Col } from "react-bootstrap";
// import Video from "../components/Video";
// import videos from "../PlaceHolderData/Videos";
import QuestionSelection from "../components/Questions";
import WebcamStreamCapture from "../components/WebStreamCapture";
import FileUpload from "../components/FileUpload/FileUploader";
import { useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";
import VideoListScreen from "../screens/VideoListScreen"

const PrivateScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;
  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <ProfileCard />
          <WebcamStreamCapture />
          <QuestionSelection />
        </div>
        <FileUpload />
        <br />
        <h1>Your uploaded videos </h1>
        <VideoListScreen />
        {/* <Row>
          {videos.map((video) => (
            <Col key={video._id} sm={12} md={6} lg={4} xl={3}>
              <Video video={video} />
            </Col>
          ))}
        </Row> */}
      </div>
    </div>
  );
};

export default PrivateScreen;
