import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import MyVideoList from "../components/MyVideoList";
// import { listMyPrivateVideos } from '../actions/Actions'; // do we need to fetch this?
import { Link } from "react-router-dom";
import { skillsList } from "../components/skillsList";
import ProfileCard from "../components/ProfileCard";
import EditVideo from "../components/FileUpload/EditVideo";

const animatedComponents = makeAnimated();
// const {skillOptions} = Skills;
const ProfileScreen = ({ location, history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [primarySkillsArray, setPrimarySkillsArray] = useState([]);
  const [userLocation, setuserLocation] = useState("");
  const [linkedIN, setLinkedIn] = useState("");
  // const [uploading, setUploading] = useState(false);
  const [showVideoList, SetShowVideoList] = useState(false);

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
    // eslint-disable-next-line
  }, [dispatch, history, userInfo]);

  const primarySkills = primarySkillsArray.map((item) => item.value);
  // console.log(primarySkills);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("primary skills is: ", primarySkills);
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          username,
          email,
          password,
          primarySkills,
          userLocation,
          linkedIN,
        })
      );
      setMessage("");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
      <h1 style={{ color: "transparent" }}>Header spacer</h1>
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
        <hr />
        <ProfileCard />
        {!showVideoList ? (
          <div>
            <Button
              className="my-3"
              variant="primary"
              onClick={() => SetShowVideoList(true)}
            >
              <i class="far fa-file-video"></i> Show list of all your videos
            </Button>
          </div>
        ) : (
          <div>
            {" "}
            <Button
              className="my-3"
              variant="secondary"
              onClick={() => SetShowVideoList(false)}
            >
              Update your profile
            </Button>
          </div>
        )}
      </div>

      {!showVideoList ? (
        <Row className="m-3">
          <Col md={15}>
            <h2>Update Profile <i class="fas fa-user-circle"></i></h2>

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
                  <h6 style={{ color: "transparent" }}>Header spacer</h6>
                    <i class="far fa-address-card"></i> Username:{" "}
                    {userInfo ? userInfo.username : "Username for this card"}
                  </Form.Label>
                  <Form.Control
                    type="name"
                    hidden={true}
                    placeholder={
                      userInfo ? userInfo.username : "Enter Username"
                    }
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>
                    ???? Email Address :{" "}
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
                    value={primarySkillsArray}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    onChange={(e) => {
                      // SkillsFromList(e);
                      setPrimarySkillsArray(e);
                      // console.log(primarySkills);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="userLocation">
                  <Form.Label><i class="fas fa-map-marked-alt"></i> Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Location"
                    value={userLocation}
                    onChange={(e) => setuserLocation(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="LinkedIn">
                  <Form.Label>
                    {" "}
                    <i class="fab fa-linkedin"></i> LinkedIn
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="www.linkedin.com/..."
                    value={linkedIN}
                    onChange={(e) => setLinkedIn(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <h4 style={{ color: "#fb8500" }}>
                  <i class="fas fa-user-shield"></i>
                </h4>
                <Form.Group controlId="password">
                  <Form.Label>???? NEW Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter NEW password to change"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label>
                    <i class="fas fa-lock"></i> Confirm NEW Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm NEW password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  ></Form.Control>
                </Form.Group>
                {/* to be developed ???? */}
                {/* <Form.Group controlId="image">
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
              </Form.Group> */}
                <hr />
                <Button type="submit" variant="primary">
                  Update <i class="fas fa-sync-alt"></i> 
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      ) : (
        <MyVideoList />
      )}
    </div>
  );
};

export default ProfileScreen;
