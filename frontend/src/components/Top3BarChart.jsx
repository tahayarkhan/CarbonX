import React from 'react'
import { User } from "lucide-react";
import { motion } from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';


const Top3BarChart = ({ top3 }) => {
    if (!top3 || top3.length === 0) return null;
    
    // Filter out any null or undefined items
    const validTop3 = top3.filter(item => item && item.user);
    
    // Reorder the top3 array to match the desired layout: [2nd, 1st, 3rd]
    const orderedTop3 = [
      validTop3[1], // 2nd place
      validTop3[0], // 1st place
      validTop3[2]  // 3rd place
    ];
  
    // Fixed heights for each position
    const heights = ['140px', '200px', '100px']; // [2nd, 1st, 3rd]
    
    return (
      <div className="w-full mb-8">
        <h3 className="text-xl text-center font-semibold text-zinc-800 mb-32">Top 3 Performers</h3>
        <div className="flex items-end justify-between h-[220px] gap-4">
          {orderedTop3.map((item, index) => {
            if (!item || !item.user) return null;
            
            const colors = ['bg-zinc-300', 'bg-amber-400', 'bg-amber-600'];
            const positions = ['2nd', '1st', '3rd'];
            const barWidths = ['w-3/4', 'w-full', 'w-3/4'];
            const delays = [0.2, 0, 0.4];
            
            return (
              <div key={item._id} className={`${barWidths[index]} flex flex-col items-center`}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: delays[index] }}
                  className="flex flex-col items-center mb-2"
                >
                  {item.user.profilePicture ? (
                    <img 
                      src={item.user.profilePicture} 
                      alt={item.user.name || 'User'}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-zinc-700 mt-1">{item.user.name || 'Anonymous'}</span>
                  <span className="text-xs text-zinc-500">{positions[index]}</span>
                </motion.div>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: heights[index] }}
                  transition={{ 
                    duration: 1,
                    delay: delays[index],
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  style={{ height: heights[index] }}
                  className={`w-full ${colors[index]} rounded-t-lg`}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

export default Top3BarChart


