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

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label><i class="far fa-address-card"></i> Username</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Username"
            value={username}
            required="true"
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>📧 Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required="true"
            // onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => {
              !e.target.value.indexOf(".") <= 0
                ? setEmail(e.target.value)
                : setEmail("");
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>🔓 Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            rrequired="true"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Form.Text style={{fontSize:'0.70rem'}} muted>
            Min. 6 characters with letters and
            numbers. NO spaces, special characters, nor emoji.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label><i class="fas fa-lock"></i> Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            required="true"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button style={{ marginTop: "0.5rem" }} type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
