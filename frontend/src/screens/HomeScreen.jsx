import React from "react";
import { Row, Col } from "react-bootstrap";
import { Route } from 'react-router-dom';
import Video from "../components/Video";
import videos from "../PlaceHolderData/Videos";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen"
import ForgotpasswordScreen from "./ForgotpasswordScreen"
import PrivateScreen from'./PrivateScreen';

const HomeScreen = () => {
  return (
    <div>
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/forgotpassword" component={ForgotpasswordScreen} />
      {/* need to pass the "loggedIn" state to this component */}
      <PrivateScreen /> 
      <h1>Log in to access advanced features</h1>
      <hr />
      <h4>Sample videos </h4>
      <Row>
        {videos.map((video) => (
          <Col key={video._id} sm={12} md={6} lg={4} xl={3}>
            <Video video={video} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
