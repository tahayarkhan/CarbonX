import React, { useState } from 'react';
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
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Track Your Daily Usage
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="waterUsage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Water Usage (liters)
            </label>
            <input
              type="number"
              id="waterUsage"
              placeholder="Enter water usage"
              value={waterUsage}
              onChange={(e) => setWaterUsage(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="electricityUsage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Electricity Usage (kWh)
            </label>
            <input
              type="number"
              id="electricityUsage"
              placeholder="Enter electricity usage"
              value={electricityUsage}
              onChange={(e) => setElectricityUsage(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="carUsage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Car Usage (km)
            </label>
            <input
              type="number"
              id="carUsage"
              placeholder="Enter car usage"
              value={carUsage}
              onChange={(e) => setCarUsage(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FootprintForm;
