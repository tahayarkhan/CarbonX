import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import leaf from '/leaf.png';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('authToken', data.token);

      navigate('/dashboard');
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-500 via-green-500 to-black">
      <div className="p-6 shadow-lg rounded-lg w-96 h-[619px] bg-gray-900">
        <a href="/" className="text-center no-underline">
          <h2 className="text-white font-bold text-3xl mt-8">
            Carbon
            <img
              src={leaf}
              alt="leaf"
              className="inline-block w-14 h-14 ml-2"
            />
          </h2>
        </a>

        <form onSubmit={submitHandler} className="mt-8">
          <div className="mb-6">
            <label htmlFor="email" className="block text-white text-sm mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-white text-sm mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-500 text-black font-bold rounded-full hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-white text-sm mt-6 underline cursor-pointer">
          Forgot your password?
        </p>

        <p className="text-center text-white text-sm mt-4">
          Don't have an account?{' '}
          <a href="/register" className="underline">
            Sign up.
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
