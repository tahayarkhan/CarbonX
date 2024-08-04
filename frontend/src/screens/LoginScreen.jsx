import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid email or password');
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
            <h2 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Login</h2>
            <Form onSubmit={submitHandler}>
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
                  className="mb-4"
                />
              </Form.Group>

              <Button type='submit' variant='primary' className="w-100">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
