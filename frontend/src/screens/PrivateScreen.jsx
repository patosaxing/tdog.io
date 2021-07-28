import React from "react";

import { Row, Col } from "react-bootstrap";
import Video from "../components/Video";

import videos from "../PlaceHolderData/Videos";
import QuestionSelection from "../Components/Questions";
import WebcamStreamCapture from "../Components/WebStreamCapture";
import FileUpload from "../Components/FileUpload/FileUploader";
import { useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";

const PrivateScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <QuestionSelection />
          <ProfileCard />
        </div>
        <WebcamStreamCapture />
        <FileUpload />
        <h1>Your uploaded videos </h1>
        <Row>
          {videos.map((video) => (
            <Col key={video._id} sm={12} md={6} lg={4} xl={3}>
              <Video video={video} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PrivateScreen;
