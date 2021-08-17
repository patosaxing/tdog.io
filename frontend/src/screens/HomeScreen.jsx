import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Route } from "react-router-dom";
import SampleVideo from "../components/SampleVideo";
import SampleVideos from "../PlaceHolderData/SampleVideos";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import ForgotpasswordScreen from "./ForgotpasswordScreen";
import PrivateScreen from "./PrivateScreen";
import { useSelector } from "react-redux";
import Tilty from "react-tilty";
import JobSeeker from "../img/JobSeeker.svg";
import Recruiter from "../img/Recruiter.svg";

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
          <div style={{ display: "flex"}}>
          <Tilty style={{marginRight: "2rem" }}  glare scale={1.05} maxGlare={0.5}>
          <Card style={{ height: "20rem" }}>
            <Card.Img src={JobSeeker} style={{opacity:"0.3"}}/>
            <Card.ImgOverlay style={{color:'black'}}>
              <Card.Title>Job-Seeker</Card.Title>
              <Card.Text>
                You can record and can post your videos for rating and
                comments from fellow users. There may be an ability to create
                working groups, have hosted content advice from HR
                professionals, webcasts and online training sessions based upon
                aggregated feedback. 
              </Card.Text>
              </Card.ImgOverlay>
          </Card>
          </Tilty>
          <Tilty  glare scale={1.05} maxGlare={0.5}>
          <Card style={{ height: "20rem" }}>
            <Card.Img src={Recruiter} style={{opacity:"0.3"}}/>
            <Card.ImgOverlay style={{color:'black'}}>
              <Card.Title>Recruiter</Card.Title>
              <Card.Text>
                You can post jobs, receive video submissions and review shared profiles and videos to other talent-hunter. You can post specific question that related to your company only.
              </Card.Text>
              </Card.ImgOverlay>
          </Card>
          </Tilty>
          </div>
          <hr />
          <h4>Sample videos </h4>
          <Row>
            {SampleVideos.map((video) => (
              <Col key={video._id} sm={12} md={6} lg={4} xl={3}>
                <SampleVideo video={video} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};


export default HomeScreen;
