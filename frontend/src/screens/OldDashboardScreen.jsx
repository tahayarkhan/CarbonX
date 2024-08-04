// import React, { useState, useEffect } from 'react';
// import { Form, Button, Row, Col, Table } from 'react-bootstrap';
// import axios from 'axios';

// const DashboardScreen = () => {
//   const [waterUsage, setWaterUsage] = useState(0);
//   const [electricityUsage, setElectricityUsage] = useState(0);
//   const [carUsage, setCarUsage] = useState(0);
//   const [footprints, setFootprints] = useState([]);

//   useEffect(() => {
//     const fetchFootprints = async () => {
//       const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       const { data } = await axios.get('/api/footprints', config);
//       setFootprints(data);
//     };

//     fetchFootprints();
//   }, []);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.post(
//       '/api/footprints',
//       { waterUsage, electricityUsage, carUsage },
//       config
//     );

//     setFootprints([...footprints, data]);
//   };

//   return (
//     <>
//       <Row>
//         <Col md={6}>
//           <h2>Track Your Daily Usage</h2>
//           <Form onSubmit={submitHandler}>
//             <Form.Group controlId='waterUsage'>
//               <Form.Label>Water Usage (liters)</Form.Label>
//               <Form.Control
//                 type='number'
//                 placeholder='Enter water usage'
//                 value={waterUsage}
//                 onChange={(e) => setWaterUsage(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId='electricityUsage'>
//               <Form.Label>Electricity Usage (kWh)</Form.Label>
//               <Form.Control
//                 type='number'
//                 placeholder='Enter electricity usage'
//                 value={electricityUsage}
//                 onChange={(e) => setElectricityUsage(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId='carUsage'>
//               <Form.Label>Car Usage (km)</Form.Label>
//               <Form.Control
//                 type='number'
//                 placeholder='Enter car usage'
//                 value={carUsage}
//                 onChange={(e) => setCarUsage(e.target.value)}
//               />
//             </Form.Group>

//             <Button type='submit' variant='primary'>
//               Submit
//             </Button>
//           </Form>
//         </Col>

//         <Col md={6}>
//           <h2>Your Footprints</h2>
//           <Table striped bordered hover responsive className='table-sm'>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Water (liters)</th>
//                 <th>Electricity (kWh)</th>
//                 <th>Car (km)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {footprints.map((footprint) => (
//                 <tr key={footprint._id}>
//                   <td>{footprint.date.substring(0, 10)}</td>
//                   <td>{footprint.waterUsage}</td>
//                   <td>{footprint.electricityUsage}</td>
//                   <td>{footprint.carUsage}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default DashboardScreen;
