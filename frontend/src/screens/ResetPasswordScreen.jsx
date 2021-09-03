import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import Message from '../components/Message';

const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState(null);

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      console.log("paw reset sent");
      const { data } = await axios.put(
        `/api/users/passwordreset/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

      console.log(data);
      setMessage(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <FormContainer>
      <h1 style={{ color: "transparent" }}>Header spacer</h1>

      <Form onSubmit={resetPasswordHandler}>
        <h3>Reset your Password</h3>
        {/* {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
        )} */}
        {message && <Message variant="success">{message}  <Link to="/login"><i class="fas fa-chevron-circle-right"></i> Login with new Password</Link></Message>}
        {error && <Message variant="danger">{error}</Message>}
        <Form.Group controlId="password">
          <Form.Label>
            <i class="fas fa-lock-open"></i> Password
          </Form.Label>
          <Form.Control
            type="password"
            required={true}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="confirmPassword">
          <Form.Label>
            <i class="fas fa-lock"></i> Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            required={true}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type="submit" variant="secondary">
          Reset Password <i class="fas fa-key"></i>
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordScreen;
