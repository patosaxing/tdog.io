import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Video from "../components/Video";
import videos from "../PlaceHolderData/Videos";
import QuestionSelection from "../components/Questions";
import WebcamStreamCapture from "../components/WebStreamCapture";
import FileUpload from "../components/FileUpload/FileUploader";

const PrivateScreen = () => {
  const [loggedIN, setLoggedIN] = useState(true);
  return (
    <div>
      {loggedIN ? (
        <div>
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
      ) : (
        <h7 style={{backgroundColor:'lightblue'}}> User has NOT logged in</h7>
      )}
    </div>
  );
};

export default PrivateScreen;
