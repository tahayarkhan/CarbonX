import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Jumbotron } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <Container>
      <Jumbotron>
        <h1>Welcome to the Carbon Footprint Tracker</h1>
        <p>
          Track and reduce your carbon footprint by monitoring your daily water, electricity, and car usage.
        </p>
        <p>
          <Link to='/register' className='btn btn-primary'>
            Get Started
          </Link>
        </p>
      </Jumbotron>
    </Container>
  );
};

export default HomeScreen;
