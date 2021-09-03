import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import axios from "axios";

const ForgorpasswordScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const redirect = location.search ? location.search.split('=')[1] : '/'


  const submitHandler= async (e) => {
    e.preventDefault();
    alert('Please check your email')
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/users/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data);
      // setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <FormContainer>
       <h1 style={{ color: "transparent" }}>Header spacer</h1>
      <h1>Forgot Password</h1>
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        
        <Form.Group controlId='userName'>
          <Form.Label><i class="fas fa-user-shield"></i> User Name</Form.Label>
          <Form.Control
            type='string'
            placeholder='Enter User Name'
            value={userName}
            required={true}
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <h6 style={{ color: "transparent" }}>Header spacer</h6>
        <Form.Group controlId='email'>
          <Form.Label>Please enter the email address you register your account with. We
            will send you reset password confirmation to this email.</Form.Label>
          <Form.Control
            type='email'
            placeholder='Registered email'
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="my-4" type='submit' variant='primary'>
          Reset Password <i class="far fa-window-restore"></i>
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Try Again with new password?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default ForgorpasswordScreen;