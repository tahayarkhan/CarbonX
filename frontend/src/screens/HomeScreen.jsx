import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Row className="justify-content-center text-center w-100">
        <Col md={8} className="bg-white p-5 rounded shadow">
          <h1 className="display-4 text-primary">CarbonX</h1>
          <Link to='/register'>
            <Button variant="primary" size="lg" className="mt-3" >Get Started</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
