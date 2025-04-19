import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import leaf from '/leaf.png';
import { userLogin } from '@/services/api';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      const  data  = await userLogin({ email, password });

      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('authToken', data.token);
      navigate('/dashboard');

    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-green-500 to-emerald-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Glow Elements */}
      <div className="absolute w-[400px] h-[400px] bg-green-400 dark:bg-emerald-900 rounded-full opacity-20 blur-[100px] animate-pulse top-10 left-10" />
      <div className="absolute w-[300px] h-[300px] bg-emerald-400 dark:bg-teal-900 rounded-full opacity-20 blur-[80px] animate-pulse bottom-20 right-20" />
      <div className="absolute w-[250px] h-[250px] bg-teal-400 dark:bg-green-900 rounded-full opacity-20 blur-[60px] animate-blob top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Form Container */}
      <motion.div
        className="w-full max-w-md p-8 shadow-2xl rounded-3xl bg-white/10 dark:bg-gray-900/30 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
          <a href="/" className="no-underline">
            <motion.h2 
                  className="text-4xl font-extrabold text-white tracking-tight text-center mb-8"
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
           </a>  

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex items-center gap-3 bg-white/10 dark:bg-white/5 rounded-lg px-4 py-3">
            <Mail className="text-white opacity-70" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full outline-none text-white placeholder-white/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-3 bg-white/10 dark:bg-white/5 rounded-lg px-4 py-3">
            <Lock className="text-white opacity-70" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent w-full outline-none text-white placeholder-white/60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 bg-white/20 dark:bg-gray-800/30 text-white font-semibold rounded-full 
                       hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300 
                       hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 backdrop-blur-sm 
                       border border-white/30 dark:border-gray-600/30"
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        <p className="text-white text-center mt-6 text-sm opacity-80">
          Don't have an account?{" "}
          <a href="/register" className="underline hover:text-green-300 transition-colors">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
