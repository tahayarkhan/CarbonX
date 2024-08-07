import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      alert('Error occurred during registration');
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Register</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mb-4"
                />
              </Form.Group>

              <Button type='submit' variant='primary' className="w-100">
                Register
              </Button>
            </Form>

            <div className="text-center mt-3">
              <span>Already have an account? </span>
              <Link to="/login" style={{ color: '#007bff' }}>
                Login
              </Link>
            </div>
            
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
