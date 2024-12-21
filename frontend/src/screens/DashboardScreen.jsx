import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { createModel, trainModel, predict } from '../../../backend/predictiveModel';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DashboardScreen = () => {
  const [footprints, setFootprints] = useState([]);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState({ water: [], electricity: [], car: [] });
  const navigate = useNavigate();


  useEffect(() => {
    const initializeModel = async () => {
      const { model: loadedModel, footprintsData } = await fetchDataAndTrainModel();
      setFootprints(footprintsData);
      setModel(loadedModel);
    };

    initializeModel();
  }, []);

  
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

  const handleAddFootprints = () => {
    navigate('/footprintform');
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
    <Container fluid className="d-flex align-items-start justify-content-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="w-100">
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
          
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button onClick={handlePredict} variant='primary'>Predict Future Usage</Button>
            <Button onClick={handleAddFootprints} variant='primary'>Add more footprints</Button>
          </div>
          
          {/* Graphs stacked vertically */}
          <div className="mt-4">
            <h4 className="text-center">Predicted Water Usage</h4>
            <div style={{ height: '300px' }}>
              <Line data={chartData(['Current', 'Predicted'], predictions.water, 'Water Usage')} key={JSON.stringify(predictions.water)} />
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-center">Predicted Electricity Usage</h4>
            <div style={{ height: '300px' }}>
              <Line data={chartData(['Current', 'Predicted'], predictions.electricity, 'Electricity Usage')} key={JSON.stringify(predictions.electricity)} />
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-center">Predicted Car Usage</h4>
            <div style={{ height: '300px' }}>
              <Line data={chartData(['Current', 'Predicted'], predictions.car, 'Car Usage')} key={JSON.stringify(predictions.car)} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DashboardScreen;
