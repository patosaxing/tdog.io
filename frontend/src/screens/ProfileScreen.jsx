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

import {skillsList} from "../components/skillsList";
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

  // AutoCOmplteFuntion
  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      let a,
        b,
        i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      let x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode === 40) {
        /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 38) {
        //up
        /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      let x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt !== x[i] && elmnt !== inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    // document.addEventListener("click", function (e) {
    //   setPrimarySkills(e.target.value);
    //   // closeAllLists(e.target);
    // });
  }

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
              <Select
                options= {skillsList}
                isMulti
                closeMenuOnSelect={false}
                components={animatedComponents}
              />
              {/* <Form.Group className="autocomplete" controlId="skills">
                <Form.Label>
                  <i class="fas fa-drafting-compass"></i> Primary Skill
                </Form.Label>

                <Form.Control
                  type="text"
                  id="myInput"
                  value={primarySkill}
                  placeholder="Enter Skill"
                  onChange={(e) => {
                    autocomplete(document.getElementById("myInput"), skillList);
                    console.log("skill section", e.target.value);
                    setPrimarySkills(autocomplete(document.getElementById("myInput"), skillList));
                  }}
                ></Form.Control>
              </Form.Group> */}

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
