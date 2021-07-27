import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import Video from "../Components/Video";
import videos from "../PlaceHolderData/Videos";
import QuestionSelection from "../Components/Questions";
import WebcamStreamCapture from "../Components/WebStreamCapture";
import FileUpload from "../Components/FileUpload/FileUploader";
import  { useSelector } from "react-redux";


const PrivateScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      <div>
      <Alert variant="info" style={{float: 'right'}}> Welcome to {userInfo.username} workspace 💼</Alert>
        <QuestionSelection />
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
