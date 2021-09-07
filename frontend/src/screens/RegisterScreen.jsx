import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      // set timer to clear message
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } else {
      dispatch(register(username, email, password));
    }
  };

  const displayButton = ()=> {

  }

  return (
    <FormContainer>
      <h1 style={{ color: "transparent" }}>Header spacer</h1>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>
            <i class="far fa-address-card"></i> Username
          </Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Username"
            value={username}
            required={true}
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label className="mt-3">📧 Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required={true}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => {
              !e.target.value.indexOf(".") <= 0
                ? setEmail(e.target.value)
                : setEmail("");
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="mt-3">🔓 Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            required={true}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label className="mt-3">
            <i class="fas fa-lock"></i> Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            required={true}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
            <p className="mt-3">
               <em>By clicking Sign Up, you agree to have read and agreed to<a href="https://docs.google.com/document/d/1vdRH146syKsCYxlzuARm4LKslCHqr4uazxJWaLG020M/edit?usp=sharing" target="_blank" rel="noopener noreferrer"> Terms and Conditions</a></em>
              
            </p>
        <Button className="my-4" type="submit" variant="primary">
          <i class="fas fa-user-plus"></i> Sign Up
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login <i class="fas fa-sign-in-alt"></i>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
