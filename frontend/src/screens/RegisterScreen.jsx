import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import leaf from '/leaf.png';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

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
      navigate('/dashboard');
    } catch (error) {
      alert('Error occurred during registration');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-black">
      <div className="p-8 shadow-lg bg-gray-900 rounded-2xl w-[375px] h-[719px]">
        <a href="/" className="no-underline">
          <h2 className="text-white text-center font-bold text-3xl mt-2">
            Carbon
            <img src={leaf} alt="leaf" className="inline-block w-14 h-14 ml-2" />
          </h2>
        </a>

        <form onSubmit={submitHandler} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-white text-sm mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
            <label htmlFor="username" className="block text-white text-sm mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-white text-sm mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-600 transition duration-300"
          >
            Sign up
          </button>
        </form>

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
