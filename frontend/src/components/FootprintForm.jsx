import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet, Zap, Car } from 'lucide-react';
import { submitFootprintData } from '@/services/api';

const FootprintForm = () => {
  const [waterUsage, setWaterUsage] = useState('');
  const [electricityUsage, setElectricityUsage] = useState('');
  const [carUsage, setCarUsage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitFootprintData({ waterUsage, electricityUsage, carUsage });

    setWaterUsage('');
    setElectricityUsage('');
    setCarUsage('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/30 dark:border-gray-700/40 rounded-3xl shadow-xl space-y-6"
      >
      <h2 className="text-2xl font-semibold text-white dark:text-gray-100 text-center">
        Add Your Footprint
      </h2>

      {/* Input Grid */}
      <div className="grid gap-4">
        {/* Water Usage */}
        <div className="flex items-center gap-3 bg-white/30 dark:bg-gray-800/50 rounded-xl px-4 py-3 border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-400">
          <Droplet className="text-blue-400" size={22} />
          <input
            type="number"
            placeholder="Water Usage (L)"
            value={waterUsage}
            onChange={(e) => setWaterUsage(e.target.value)}
            className="bg-transparent w-full outline-none placeholder-gray-500 text-white"
            required
          />
        </div>

        {/* Electricity Usage */}
        <div className="flex items-center gap-3 bg-white/30 dark:bg-gray-800/50 rounded-xl px-4 py-3 border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-yellow-400">
          <Zap className="text-yellow-400" size={22} />
          <input
            type="number"
            placeholder="Electricity Usage (kWh)"
            value={electricityUsage}
            onChange={(e) => setElectricityUsage(e.target.value)}
            className="bg-transparent w-full outline-none placeholder-gray-500 text-white"
            required
          />
        </div>

        {/* Car Usage */}
        <div className="flex items-center gap-3 bg-white/30 dark:bg-gray-800/50 rounded-xl px-4 py-3 border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-red-400">
          <Car className="text-red-400" size={22} />
          <input
            type="number"
            placeholder="Car Usage (km)"
            value={carUsage}
            onChange={(e) => setCarUsage(e.target.value)}
            className="bg-transparent w-full outline-none placeholder-gray-500 text-white"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-xl shadow-md"
      >
        Submit Footprint
      </motion.button>
    </motion.form>
  );
};

export default FootprintForm;
