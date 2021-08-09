import React from "react";
// import { Row, Col } from "react-bootstrap";
// import Video from "../components/Video";
// import videos from "../PlaceHolderData/Videos";
import QuestionSelection from "../components/Questions";
import WebcamStreamCapture from "../components/WebStreamCapture";
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
        <VideoListScreen />
       
      </div>
    </div>
  );
};

export default PrivateScreen;
