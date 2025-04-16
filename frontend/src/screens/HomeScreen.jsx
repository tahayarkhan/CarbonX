import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import leaf from "../../public/leaf.png"

const HomeScreen = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-green-600 via-green-500 to-emerald-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base glow elements */}
        <div className="absolute w-[500px] h-[500px] bg-green-400 dark:bg-emerald-900 rounded-full opacity-20 blur-[100px] animate-pulse top-10 left-10" />
        <div className="absolute w-[400px] h-[400px] bg-emerald-400 dark:bg-teal-900 rounded-full opacity-20 blur-[80px] animate-pulse bottom-20 right-20" />
        <div className="absolute w-[300px] h-[300px] bg-teal-400 dark:bg-green-900 rounded-full opacity-20 blur-[60px] animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Moving blob elements */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-400 dark:bg-emerald-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-400 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-teal-400 dark:bg-green-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Additional subtle glow elements */}
        <div className="absolute w-[200px] h-[200px] bg-green-300 dark:bg-emerald-800 rounded-full opacity-10 blur-[50px] animate-pulse top-1/4 right-1/4" />
        <div className="absolute w-[150px] h-[150px] bg-emerald-300 dark:bg-teal-800 rounded-full opacity-10 blur-[40px] animate-pulse bottom-1/4 left-1/4" />
      </div>

      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-24 relative z-10">
        <motion.div 
          className="backdrop-blur-md bg-white/10 dark:bg-gray-900/30 p-10 rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/30 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            <motion.div 
              className="space-y-6 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Carbon <motion.span 
                  className="text-green-300 dark:text-emerald-400"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >X</motion.span>
              </motion.h2>
              
              <motion.p 
                className="text-xl sm:text-2xl text-white/90 dark:text-gray-200 font-light tracking-wide max-w-2xl leading-relaxed text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Track, reduce, and offset your carbon footprint with our innovative sustainability platform
              </motion.p>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                to="/register"
                className="flex-1 text-center py-4 px-8 bg-white/20 dark:bg-gray-800/30 text-white font-bold text-lg rounded-full 
                         hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] 
                         hover:scale-105 backdrop-blur-sm border border-white/30 dark:border-gray-600/30"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="flex-1 text-center py-4 px-8 bg-transparent text-white font-bold text-lg rounded-full 
                         hover:bg-white/10 dark:hover:bg-gray-700/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] 
                         hover:scale-105 backdrop-blur-sm border border-white/30 dark:border-gray-600/30"
              >
                Sign In
              </Link>
            </motion.div>

            <motion.div
              className="text-white/80 dark:text-gray-300 text-sm tracking-wide text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Join thousands of users making a difference
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Centered scroll cue with bouncing arrow */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-3"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-white/80 dark:text-gray-300 text-sm tracking-wide font-medium">Scroll to explore</div>
          <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeScreen;
