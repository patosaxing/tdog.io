import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from '../components/FormContainer';
import axios from "axios";

const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      console.log('paw reset sent');
      const { data } = await axios.put(
        `/api/users/passwordreset/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

      console.log(data);
      setSuccess(data.data);
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
        {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
        )}
        <Form.Group controlId="password">
          <Form.Label><i class="fas fa-lock-open"></i> Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId='confirmPassword'>
          <Form.Label><i class="fas fa-lock"></i> Confirm Password</Form.Label>
          <Form.Control
            type='password'
            required
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type='submit' variant='secondary'>
          Reset Password <i class="fas fa-key"></i>
        </Button>
      </Form>
      </FormContainer>
  );
};

export default ResetPasswordScreen;
