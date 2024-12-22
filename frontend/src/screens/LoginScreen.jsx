import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  leaf  from '/leaf.png';

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
    <div
      className="d-flex align-items-center justify-content-center vh-100 vw-100"
      style={{ 
        backgroundColor: '#5BC562',
        backgroundImage: 'linear-gradient(to bottom, #5BC562,rgba(0, 0, 0, 0.8))', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      
      }}
    >

      <div 
        className="p-5 shadow"
        style={{ width: '375px', height: '619px', backgroundColor: '#1C211C', borderRadius: '25px' }}
      >
        

        <a href='/' style={{ textDecoration: 'none' }}>
          <h2 className="text-center" style={{ marginTop: '30px', color: '#FFFFFF', fontWeight: 'bold', fontSize: '37px'}}>
            Carbon
            <img src={leaf} style={{ width: '60px', height: '60px', marginRight: '10px' }} />
          </h2>
        </a>
        
          <Form onSubmit={submitHandler} >

            <Form.Group controlId='email'>

              <Form.Label style={{ marginTop: '40px', color: '#FFFFFF', fontSize: '15px'}}>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3 w-100"
                style={{ borderRadius: '10px' }}
              />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label style={{ color: '#FFFFFF', fontSize: '15px'}}>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 w-100"
                style={{ borderRadius: '10px' }}
              />
            </Form.Group>

            <Button type='submit' variant='primary' className="w-100" style={{backgroundColor: '#5BC562', color: '#000000', fontWeight: 'bold', borderRadius: '28px'}}>
              Login
            </Button>
        
          </Form>

          <p className='text-center' style={{ marginTop: '50px', color: '#FFFFFF', fontSize: '15px', textDecoration: 'underline'}}>Forgot your password?</p>

          <p className='text-center' style={{ color: '#FFFFFF', fontSize: '15px'}}>
            Don't have an account? {''} 
            <a href="/register" style={{ color: '#FFFFFF', fontSize: '15px', textDecoration: 'underline'}}>Sign up.</a>
          </p> 
        
      </div>
     
    </div>
  );
};

export default LoginScreen;
