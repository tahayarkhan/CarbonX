import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <Container className="my-5 py-5 bg-light rounded-3">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h1 className="display-4">Welcome to the Carbon Footprint Tracker</h1>
          <p className="lead">
            Track and reduce your carbon footprint by monitoring your daily water, electricity, and car usage.
          </p>
          <p>
            <Link to='/register'>
              <Button variant="primary" size="lg">Get Started</Button>
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;