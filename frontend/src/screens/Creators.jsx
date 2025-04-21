import React from 'react';
import { motion } from 'framer-motion';
import taha from "../assets/pfp.png"
import arjun from "../assets/arjun.jpeg"
import sach from "../assets/sach.jpeg"
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const Creators = () => {
  const creators = [
    {
      name: "Taha Yar Khan",
      role: "Full Stack Developer",
      image: taha,
      github: "https://github.com/tahayarkhan",
      linkedin: "https://www.linkedin.com/in/taha-yar-khan/",
      description: "Bringing creative energy to full stack dev and passionate about building impactful tech for sustainability."
    },
    {
      name: "Arjun Sharma",
      role: "Full Stack Developer",
      image: arjun,
      github: "https://github.com/arj5",
      linkedin: "https://www.linkedin.com/in/arj-shar/",
      description: "Enthusiastic about designing scalable systems and always exploring new tech to solve real-world problems."
    },
    {
      name: "Sachman Dhaliwal",
      role: "Full Stack Developer",
      image: sach,
      github: "https://github.com/SachmanSDhaliwal",
      linkedin: "https://www.linkedin.com/in/sachman-dhaliwal-795691257/",
      description: "Focused on clean code and seamless user experiences, with a love for learning and collaborating on big ideas."
    }
  ];

  return (
    <div id="creators" className="min-h-screen w-full  from-green-600 via-green-500 to-emerald-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Meet the Creators</h2>
          <p className="text-xl text-white/80">The passionate team behind CarbonX</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {creators.map((creator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative bg-white/10 dark:bg-gray-800/40 rounded-2xl p-8 ring-1 ring-white/10 backdrop-blur-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 mb-8"
            >
              <div className="flex flex-col items-center">
                <div className="w-36 h-36 rounded-full overflow-hidden mb-6 border-4 border-white/30 shadow-lg transition-transform duration-300 hover:scale-110">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-1">{creator.name}</h3>
                <p className="text-emerald-300 dark:text-emerald-400 mb-3 font-medium">{creator.role}</p>
                <p className="text-white/80 text-center mb-4 text-base">{creator.description}</p>
                
                <div className="flex gap-5 mt-4">
                  <a
                    href={creator.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-300 transition"
                    aria-label={`${creator.name}'s GitHub`}
                  >
                    <FaGithub className="w-7 h-7" />
                  </a>
                  <a
                    href={creator.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-300 transition"
                    aria-label={`${creator.name}'s LinkedIn`}
                  >
                    <FaLinkedin className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Creators;
