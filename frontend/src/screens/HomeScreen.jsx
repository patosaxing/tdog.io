import React from "react";
import { Row, Col } from "react-bootstrap";
import { Route } from "react-router-dom";
import Video from "../components/Video";
import SampleVideos from "../PlaceHolderData/SampleVideos";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import ForgotpasswordScreen from "./ForgotpasswordScreen";
import PrivateScreen from "./PrivateScreen";
import  { useSelector } from "react-redux";

const HomeScreen = () => {
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/forgotpassword" component={ForgotpasswordScreen} />
      {userInfo ? (
        <PrivateScreen />
      ) : (
        <div>
          <h6 style={{ backgroundColor: "lightblue" }}>
            {" "}
            User has NOT logged in
          </h6>
          <h1>Log in to access advanced features</h1>
          <hr />
          <h4>Sample videos </h4>
          <Row>
            {SampleVideos.map((video) => (
              <Col key={video._id} sm={12} md={6} lg={4} xl={3}>
                <Video video={video} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
