import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { DocumentTextIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import FootprintForm from '../components/FootprintForm';
import { fetchUserFootprint } from '@/services/api';

const DashboardScreen = () => {
  const [footprints, setFootprints] = useState([]);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState({ water: [], electricity: [], car: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFootprints = async () => {
     

      const  data  = await fetchUserFootprint();
      setFootprints(data);

      // const inputs = data.map(fp => [fp.waterUsage, fp.electricityUsage, fp.carUsage]);
      // const outputs = inputs;

      // const predictiveModel = createModel();
      // await trainModel(predictiveModel, inputs, outputs);
      // setModel(predictiveModel);
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

  const handleAddFootprint = (newFootprint) => {
    setFootprints((prevFootprints) => [...prevFootprints, newFootprint]);
    // Optionally, you can also send the new footprint to the server here
  };

  // const chartData = (labels, data, label) => ({
  //   labels,
  //   datasets: [
  //     {
  //       label,
  //       data,
  //       borderColor: 'rgba(75,192,192,1)',
  //       backgroundColor: 'rgba(75,192,192,0.2)',
  //       fill: true,
  //       tension: 0.4,
  //       pointRadius: 4,
  //       pointHoverRadius: 6,
  //       pointBackgroundColor: 'rgba(75,192,192,1)',
  //       pointBorderColor: '#fff',
  //       pointBorderWidth: 2,
  //     },
  //   ],
  // });

  // const chartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   animation: {
  //     duration: 1000,
  //     easing: 'easeInOutQuart',
  //   },
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       grid: {
  //         color: 'rgba(0, 0, 0, 0.05)',
  //       },
  //     },
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //     },
  //   },
  // };

  return (
    <div className="relative min-h-screen flex flex-col w-full bg-gradient-to-br from-green-600 via-green-500 to-emerald-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full"
          >
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <DocumentTextIcon className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Your Footprints</h2>
            </div>
            
            {footprints.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center py-8"
              >
                <p className="text-gray-500 mb-4">No footprints yet. Add your first one!</p>
                {/* <motion.button 
                  onClick={() => navigate('/footprintform')} 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg 
                           hover:from-blue-600 hover:to-blue-700 
                           transform hover:scale-105 
                           transition-all duration-200 
                           shadow-lg hover:shadow-xl
                           font-medium text-xs sm:text-sm tracking-wide
                           w-full sm:w-auto
                           flex items-center justify-center gap-2"
                >
                  <PlusCircleIcon className="h-5 w-5" />
                  Add your first footprint
                </motion.button> */}
              </motion.div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <div className='max-h-48 overflow-y-auto'>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Water (L)
                        </th>
                        <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Electricity (kWh)
                        </th>
                        <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Car (km)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {footprints.map((footprint, index) => (
                        <motion.tr 
                          key={footprint._id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="hover:bg-gray-50 transition-all duration-200 ease-in-out"
                        >
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {footprint.date.substring(0, 10)}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {footprint.waterUsage}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {footprint.electricityUsage}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {footprint.carUsage}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
                <motion.div 
                  className="flex justify-center mt-6 sm:mt-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* <motion.button 
                    onClick={() => navigate('/footprintform')} 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg 
                             hover:from-blue-600 hover:to-blue-700 
                             transform hover:scale-105 
                             transition-all duration-200 
                             shadow-lg hover:shadow-xl
                             font-medium text-xs sm:text-sm tracking-wide
                             w-full sm:w-auto
                             flex items-center justify-center gap-2"
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    Add more footprints
                  </motion.button> */}
                </motion.div>
              </>
            )}
          </motion.div>

          <FootprintForm onAddFootprint={handleAddFootprint} />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardScreen;
