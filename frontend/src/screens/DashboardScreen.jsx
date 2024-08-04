import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

const DashboardScreen = () => {
  const [footprints, setFootprints] = useState([]);

  useEffect(() => {
    const fetchFootprints = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get('/api/footprints', config);
      setFootprints(data);
    };

    fetchFootprints();
  }, []);

  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Row className="w-100">
        <Col md={8} className="mx-auto">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Your Footprints</h2>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Water (liters)</th>
                  <th>Electricity (kWh)</th>
                  <th>Car (km)</th>
                </tr>
              </thead>
              <tbody>
                {footprints.map((footprint) => (
                  <tr key={footprint._id}>
                    <td>{footprint.date.substring(0, 10)}</td>
                    <td>{footprint.waterUsage}</td>
                    <td>{footprint.electricityUsage}</td>
                    <td>{footprint.carUsage}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardScreen;
