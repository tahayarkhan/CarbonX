// import React, { useEffect, useState } from 'react';
// import { Table, Row, Col, Container } from 'react-bootstrap';
// import axios from 'axios';

// const DashboardScreen = () => {
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

//   return (
//     <Container fluid className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
//       <Row className="w-100">
//         <Col md={8} className="mx-auto">
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Your Footprints</h2>
//             <Table striped bordered hover responsive className='table-sm'>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Water (liters)</th>
//                   <th>Electricity (kWh)</th>
//                   <th>Car (km)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {footprints.map((footprint) => (
//                   <tr key={footprint._id}>
//                     <td>{footprint.date.substring(0, 10)}</td>
//                     <td>{footprint.waterUsage}</td>
//                     <td>{footprint.electricityUsage}</td>
//                     <td>{footprint.carUsage}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default DashboardScreen;


// import React, { useEffect, useState } from 'react';
// import { Table, Row, Col, Container, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { createModel, trainModel, predict } from '../../../backend/predictiveModel'; // Ensure you have the predictive model functions defined
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// // Register necessary components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// const DashboardScreen = () => {
//   const [footprints, setFootprints] = useState([]);
//   const [model, setModel] = useState(null);
//   const [predictions, setPredictions] = useState([]);

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

//       // Prepare data for training
//       const inputs = data.map(fp => [fp.waterUsage, fp.electricityUsage, fp.carUsage]);
//       const outputs = inputs; // For simplicity, let's predict the same data

//       // Create and train the model
//       const predictiveModel = createModel();
//       await trainModel(predictiveModel, inputs, outputs);
//       setModel(predictiveModel);
//     };

//     fetchFootprints();
//   }, []);

//   const handlePredict = () => {
//     if (model && footprints.length > 0) {
//       const latestFootprint = footprints[footprints.length - 1];
//       const input = [latestFootprint.waterUsage, latestFootprint.electricityUsage, latestFootprint.carUsage];
//       const prediction = predict(model, input);
//       setPredictions(Array.from(prediction));
//     }
//   };

//   const chartData = {
//     labels: ['Water Usage', 'Electricity Usage', 'Car Usage'],
//     datasets: [
//       {
//         label: 'Predictions',
//         data: predictions,
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: true,
//       },
//     ],
//   };

//   return (
//     <Container fluid className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
//       <Row className="w-100">
//         <Col md={8} className="mx-auto">
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Your Footprints</h2>
//             <Table striped bordered hover responsive className='table-sm'>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Water (liters)</th>
//                   <th>Electricity (kWh)</th>
//                   <th>Car (km)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {footprints.map((footprint) => (
//                   <tr key={footprint._id}>
//                     <td>{footprint.date.substring(0, 10)}</td>
//                     <td>{footprint.waterUsage}</td>
//                     <td>{footprint.electricityUsage}</td>
//                     <td>{footprint.carUsage}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//             <Button onClick={handlePredict} variant='primary' className="mt-4">Predict Future Usage</Button>
//             {predictions.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="text-center">Predicted Usage</h4>
//                 {/* Add a key prop to ensure the chart re-renders properly */}
//                 <Line data={chartData} key={JSON.stringify(predictions)} />
//               </div>
//             )}
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default DashboardScreen;

import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DashboardScreen = () => {
  const [footprints, setFootprints] = useState([]);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState({ water: [], electricity: [], car: [] });

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

      // Prepare data for training
      const inputs = data.map(fp => [fp.waterUsage, fp.electricityUsage, fp.carUsage]);
      const outputs = inputs; // For simplicity, let's predict the same data

      // Create and train the model
      const predictiveModel = createModel();
      await trainModel(predictiveModel, inputs, outputs);
      setModel(predictiveModel);
    };

    fetchFootprints();
  }, []);

  const handlePredict = () => {
    if (model && footprints.length > 0) {
      const latestFootprint = footprints[footprints.length - 1];
      const input = [latestFootprint.waterUsage, latestFootprint.electricityUsage, latestFootprint.carUsage];
      const prediction = predict(model, input);

      // Set predictions for each usage type
      setPredictions({
        water: [latestFootprint.waterUsage, prediction[0]],
        electricity: [latestFootprint.electricityUsage, prediction[1]],
        car: [latestFootprint.carUsage, prediction[2]],
      });
    }
  };

  const chartData = (labels, data, label) => ({
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  });

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
            <Button onClick={handlePredict} variant='primary' className="mt-4">Predict Future Usage</Button>
            
            <Row className="mt-4">
              <Col md={4}>
                <h4 className="text-center">Predicted Water Usage</h4>
                <div style={{ height: '300px' }}>
                  <Line data={chartData(['Current', 'Predicted'], predictions.water, 'Water Usage')} key={JSON.stringify(predictions.water)} />
                </div>
              </Col>
              <Col md={4}>
                <h4 className="text-center">Predicted Electricity Usage</h4>
                <div style={{ height: '300px' }}>
                  <Line data={chartData(['Current', 'Predicted'], predictions.electricity, 'Electricity Usage')} key={JSON.stringify(predictions.electricity)} />
                </div>
              </Col>
              <Col md={4}>
                <h4 className="text-center">Predicted Car Usage</h4>
                <div style={{ height: '300px' }}>
                  <Line data={chartData(['Current', 'Predicted'], predictions.car, 'Car Usage')} key={JSON.stringify(predictions.car)} />
                </div>
              </Col>
            </Row>


            
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardScreen;

