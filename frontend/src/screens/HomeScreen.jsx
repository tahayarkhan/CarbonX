import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';

const HomeScreen = () => {
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
      
      <Navbar/>

      <Row className="justify-content-center text-center w-100">
        <Col md={8} className="bg-white p-5 rounded shadow">
          <h1 className="display-4 text-primary">CarbonX</h1>
          <Link to='/register'>
            <Button variant="primary" size="lg" className="mt-3" >Get Started</Button>
          </Link>
        </Col>
      </Row>
    
    </div>



  );
};

export default HomeScreen;
