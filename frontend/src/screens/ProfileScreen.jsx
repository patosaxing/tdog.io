import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
// import { listMyPrivateVideos } from '../actions/Actions'; // do we need to fetch this?

import { skillsList } from "../components/skillsList";
import ProfileCard from "../components/ProfileCard";

const animatedComponents = makeAnimated();
// const {skillOptions} = Skills;
const ProfileScreen = ({ location, history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [primarySkill, setPrimarySkills] = useState("");
  const [userLocation, setuserLocation] = useState("");
  const [userLinkedIN, setUserLinkedIn] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.username) {
        dispatch(getUserDetails("profile"));
        // dispatch(listMyPrivateVideos());  ??? do we need to fetch this?
      } else {
        setUsername(user.username);
        setEmail(user.email);
      }
    }
    // }, [dispatch, history, userInfo, user]);
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          username,
          email,
          password,
          primarySkill,
          userLocation,
          userLinkedIN,
        })
      );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <ProfileCard />
      </div>
      <Row>
        <Col md={15}>
          <h2>Update Profile 📄</h2>

          {message && <Message variant="danger">{message}</Message>}
          {}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form autocomplete="off" onSubmit={submitHandler}>
              <Form.Group controlId="username">
                <Form.Label>
                  <i class="far fa-address-card"></i> Username:{" "}
                  {userInfo ? userInfo.username : "Username for this card"}
                </Form.Label>
                <Form.Control
                  type="name"
                  hidden={true}
                  placeholder={userInfo ? userInfo.username : "Enter Username"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>
                  📧 Email Address :{" "}
                  {userInfo ? userInfo.email : "Email of this card"}
                </Form.Label>
                <Form.Control
                  type="email"
                  hidden={true}
                  placeholder="Unique, NO change will be applied"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <hr />
              <Form.Group controlId="skillsList">
                <Form.Label>
                  <i class="fas fa-drafting-compass"></i> Primary Skill
                </Form.Label>
                <Select
                  options={skillsList}
                  isMulti
                  value={primarySkill}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={(e) => {
                    console.log(e)
                    setPrimarySkills(e.value)
                  }}
                />
              </Form.Group>

              <Form.Group controlId="userLocation">
                <Form.Label>📍 Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Location"
                  value={userLocation}
                  onChange={(e) => setuserLocation(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="userLinkedIn">
                <Form.Label>
                  {" "}
                  <i class="fab fa-linkedin"></i> LinkedIn
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="www.linkedin.com/..."
                  value={userLinkedIN}
                  onChange={(e) => setUserLinkedIn(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>🔓 Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                <Form.Text style={{ fontSize: "0.70rem" }} muted>
                  Min 6 characters with letters and numbers. NO spaces, special
                  characters, nor emoji.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>
                  <i class="fas fa-lock"></i> Confirm Password
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.File
                  id="image-file"
                  label="Choose File"
                  custom
                  // onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <hr />
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfileScreen;
