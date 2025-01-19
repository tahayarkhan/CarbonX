import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DashboardScreen = () => {
  const [footprints, setFootprints] = useState([]);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState({ water: [], electricity: [], car: [] });
  const navigate = useNavigate();

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

      const inputs = data.map(fp => [fp.waterUsage, fp.electricityUsage, fp.carUsage]);
      const outputs = inputs;

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
   
   
   
   <div className="flex items-center justify-center min-h-screen bg-green-50">
      
      <Navbar/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Your Footprints</h2>
            <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Water (liters)</th>
                  <th className="border border-gray-300 px-4 py-2">Electricity (kWh)</th>
                  <th className="border border-gray-300 px-4 py-2">Car (km)</th>
                </tr>
              </thead>
              <tbody>
                {footprints.map((footprint) => (
                  <tr key={footprint._id} className="odd:bg-white even:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{footprint.date.substring(0, 10)}</td>
                    <td className="border border-gray-300 px-4 py-2">{footprint.waterUsage}</td>
                    <td className="border border-gray-300 px-4 py-2">{footprint.electricityUsage}</td>
                    <td className="border border-gray-300 px-4 py-2">{footprint.carUsage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-6">
              <button onClick={handleAddFootprints} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add more footprints
              </button>
            </div>
          </div>
          </div>





          {/* <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-center text-lg font-semibold text-gray-800 mb-4">Predicted Water Usage</h4>
            <div className="h-64">
              <Line data={chartData(['Current', 'Predicted'], predictions.water, 'Water Usage')} key={JSON.stringify(predictions.water)} />
            </div>
            <h4 className="text-center text-lg font-semibold text-gray-800 mt-6 mb-4">Predicted Electricity Usage</h4>
            <div className="h-64">
              <Line data={chartData(['Current', 'Predicted'], predictions.electricity, 'Electricity Usage')} key={JSON.stringify(predictions.electricity)} />
            </div>
            <h4 className="text-center text-lg font-semibold text-gray-800 mt-6 mb-4">Predicted Car Usage</h4>
            <div className="h-64">
              <Line data={chartData(['Current', 'Predicted'], predictions.car, 'Car Usage')} key={JSON.stringify(predictions.car)} />
            </div>
            <div className="flex justify-center mt-6">
              <button onClick={handlePredict} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Predict Future Usage
              </button>
            </div>
          </div> */}



        
      </div>
    </div>
  );
};

export default DashboardScreen;
