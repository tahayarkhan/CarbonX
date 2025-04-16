import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import leaf from '/leaf.png';
import { Mail, Lock, User } from "lucide-react";
import { motion } from 'framer-motion';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, username, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('authToken', data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-black">
      <div className="w-full max-w-md p-8 shadow-2xl rounded-2xl bg-white/10 backdrop-blur-md">
        <a href="/" className="no-underline">
          <h2 className="text-white text-center font-bold text-3xl mt-2 tracking-tight hover:tracking-wide transition-all duration-300">
            Carbon
            <img src={leaf} alt="leaf" className="inline-block w-14 h-14 ml-2 transition-transform duration-300 hover:scale-110" />
          </h2>
        </a>

        <motion.div
          initial={{ opacity: 0, y: -20 }} // Initial state
          animate={{ opacity: 1, y: 0 }} // Animate to this state
          transition={{ duration: 0.5 }} // Duration of the animation
        >
          <form onSubmit={submitHandler} className="mt-6">
            <div className="mb-6">
              <label htmlFor="name" className="block text-white text-sm mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 text-white shadow-inner outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-white text-sm mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="username" className="block text-white text-sm mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-white text-sm mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-white text-sm mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-800 text-white shadow-inner outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              disabled={loading}
              className={`w-full py-3 font-bold rounded-xl transition duration-300 ${
                loading ? 'bg-green-300' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>
        </motion.div>

        <p className="text-center text-white text-sm mt-6">
          Already have an account?{' '}
          <a href="/login" className="underline">
            Login.
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
