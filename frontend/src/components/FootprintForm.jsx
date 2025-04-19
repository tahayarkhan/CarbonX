import React, { useState } from 'react';
import axios from 'axios';
import { submitFootprintData } from '@/services/api';



const FootprintForm = () => {
  const [waterUsage, setWaterUsage] = useState('');
  const [electricityUsage, setElectricityUsage] = useState('');
  const [carUsage, setCarUsage] = useState('');
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await submitFootprintData({ waterUsage, electricityUsage, carUsage });
    // Optionally, reset the form
    setWaterUsage(0);
    setElectricityUsage(0);
    setCarUsage(0);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add Footprint</h2>
      <input
        type="number"
        placeholder="Water Usage (L)"
        value={waterUsage}
        onChange={(e) => setWaterUsage(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Electricity Usage (kWh)"
        value={electricityUsage}
        onChange={(e) => setElectricityUsage(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Car Usage (km)"
        value={carUsage}
        onChange={(e) => setCarUsage(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Add Footprint
      </button>
    </form>
  );
};

export default FootprintForm;
