import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const FootprintForm = () => {
  const [waterUsage, setWaterUsage] = useState(0);
  const [electricityUsage, setElectricityUsage] = useState(0);
  const [carUsage, setCarUsage] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      '/api/footprints',
      { waterUsage, electricityUsage, carUsage },
      config
    );

    // Optionally, reset the form
    setWaterUsage(0);
    setElectricityUsage(0);
    setCarUsage(0);
  };

  return (
    <Row>
      <Col md={6}>
        <h2>Track Your Daily Usage</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='waterUsage'>
            <Form.Label>Water Usage (liters)</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter water usage'
              value={waterUsage}
              onChange={(e) => setWaterUsage(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='electricityUsage'>
            <Form.Label>Electricity Usage (kWh)</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter electricity usage'
              value={electricityUsage}
              onChange={(e) => setElectricityUsage(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='carUsage'>
            <Form.Label>Car Usage (km)</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter car usage'
              value={carUsage}
              onChange={(e) => setCarUsage(e.target.value)}
            />
          </Form.Group>

          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default FootprintForm;