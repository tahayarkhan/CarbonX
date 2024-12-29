import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import  leaf  from '/leaf.png';


const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
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
        { name, email, username, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');

    } catch (error) {
      alert('Error occurred during registration');
    }
  };

  return (

    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ 
        backgroundColor: '#5BC562',
        backgroundImage: 'linear-gradient(to bottom, #5BC562,rgba(0, 0, 0, 0.8))', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      <div 
        className="p-5 shadow"
        style={{ width: '375px', height: '719px', backgroundColor: '#1C211C', borderRadius: '25px' }}
      >
      
        <a href='/' style={{ textDecoration: 'none' }}>
          <h2 className="text-center" style={{ marginTop: '5px', color: '#FFFFFF', fontWeight: 'bold', fontSize: '37px'}}>
            Carbon
            <img src={leaf} style={{ width: '60px', height: '60px', marginRight: '10px' }} />
          </h2>
        </a>

      
        <Form onSubmit={submitHandler}>
          
          <Form.Group controlId='name'>
            <Form.Label style={{ marginTop: '15px', color: '#FFFFFF', fontSize: '15px '}}>Full Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-3"
                style={{ borderRadius: '10px' }}
              />
          </Form.Group>
          

          <Form.Group controlId='email'>
            <Form.Label style={{ color: '#FFFFFF', fontSize: '15px'}}>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3"
              style={{ borderRadius: '10px' }}
            />
          </Form.Group>

          <Form.Group controlId='username'>
            <Form.Label style={{ color: '#FFFFFF', fontSize: '15px'}}>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="mb-3"
              style={{ borderRadius: '10px' }}
            />
          </Form.Group>

         
          <Form.Group controlId='password'>
            <Form.Label style={{ color: '#FFFFFF', fontSize: '15px '}}>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-3"
              style={{ borderRadius: '10px' }}
            />
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label style={{ color: '#FFFFFF', fontSize: '15px '}}>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-3"
              style={{ borderRadius: '10px' }}
            />
          </Form.Group>

        
          <Button type='submit' variant='primary' className="w-100" style={{ marginTop: '20px',backgroundColor: '#5BC562', color: '#000000', fontWeight: 'bold', borderRadius: '28px'}}>
            Sign up
          </Button>
        
        </Form>

     
          <p className='text-center' style={{ marginTop: '25px', color: '#FFFFFF', fontSize: '15px'}}>
            Already have an account? {''} 
            <a href="/login" style={{ color: '#FFFFFF', fontSize: '15px', textDecoration: 'underline'}}>Login.</a>
          </p>
         
   
      </div>
    </div>
  );
};

export default RegisterScreen;
