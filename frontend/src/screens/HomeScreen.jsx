import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Row className="justify-content-center text-center w-100">
        <Col md={8} className="bg-white p-5 rounded shadow">
          <h1 className="display-4 text-primary">Welcome to the Carbon Footprint Tracker</h1>
          <p className="lead">
            Track and reduce your carbon footprint by monitoring your daily water, electricity, and car usage.
          </p>
          <Link to='/register'>
            <Button variant="primary" size="lg">Get Started</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
