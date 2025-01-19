import React, { useEffect, useState } from 'react';
import defaultImage from '../assets/profile/default.jpg';
import leaf from '/leaf.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [postImage, setPostImage] = useState({ myFile: '' });

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get('http://localhost:8080/api/users/profilePicture', { headers });
          const { profilePicture } = response.data;
          if (profilePicture) {
            setPostImage({ myFile: profilePicture });
          }
        }
      } catch (error) {
        console.error('Error fetching profile picture', error);
      }
    };

    fetchProfilePicture();
  }, []);

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    
    
    <nav className="bg-black fixed top-0 left-0 w-full py-4 px-6 shadow-lg z-50">
      <div className="flex items-center justify-between">
        <a href="#" className="text-white font-bold text-xl flex items-center">
          Carbon
          <img src={leaf} alt="Leaf" className="ml-2 w-8 h-8" />
        </a>
        <button
          className="text-white md:hidden"
          onClick={() => {
            const mobileNav = document.getElementById('navbarNav');
            mobileNav.classList.toggle('hidden');
          }}
        >
          <span className="material-icons">menu</span>
        </button>
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-white hover:text-green-400">
            Home
          </a>
          <a href="/dashboard" className="text-white hover:text-green-400">
            Dashboard
          </a>
          <a href="/rankings" className="text-white hover:text-green-400">
            Leaderboard
          </a>
          <div className="relative">
            <img
              src={postImage.myFile || defaultImage}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => {
                const dropdown = document.getElementById('profileDropdown');
                dropdown.classList.toggle('hidden');
              }}
            />
            <div
              id="profileDropdown"
              className="hidden absolute top-12 right-0 bg-white text-black rounded-lg shadow-md w-40 py-2"
            >
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                onClick={goToSettings}
              >
                Settings
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div id="navbarNav" className="hidden md:hidden">
        <ul className="flex flex-col items-center space-y-4 mt-4">
          <li>
            <a href="/" className="text-white hover:text-green-400">
              Home
            </a>
          </li>
          <li>
            <a href="/dashboard" className="text-white hover:text-green-400">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/rankings" className="text-white hover:text-green-400">
              Leaderboard
            </a>
          </li>
          <li>
            <button className="text-white hover:text-green-400" onClick={goToSettings}>
              Settings
            </button>
          </li>
          <li>
            <button className="text-white hover:text-green-400" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
