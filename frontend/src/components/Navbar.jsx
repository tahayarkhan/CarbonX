import React, { useEffect, useState } from 'react';
import defaultImage from '../assets/profile/default.jpg';
import leaf from '/leaf.png';
import { useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { fetchProfilePhoto } from '@/services/api';

const Navbar = () => {
  const [postImage, setPostImage] = useState({ myFile: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetchProfilePhoto();
        const { profilePicture } = response.data;
        if (profilePicture) {
          setPostImage({ myFile: profilePicture });
        }
      } catch (error) {
        console.error('Error fetching profile picture', error);
      }
    };

    fetchProfilePicture();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const goToSettings = () => {
    navigate('/settings');
  };

  const handleLeaderboardClick = () => {
    navigate('/rankings');
  };

  return (
    <nav className="bg-black/60 dark:bg-gray-900/60 backdrop-blur-md fixed top-0 left-0 w-full py-4 px-6 sm:px-8 shadow-[0_4px_30px_rgba(0,0,0,0.1)] z-50 border-b border-white/10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <a href="#" className="text-white font-bold text-xl flex items-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 dark:from-green-300 dark:via-green-400 dark:to-green-500 font-bold text-2xl tracking-wide">
            Carbon
          </span>
          <img src={leaf} alt="Leaf" className="ml-2 w-8 h-8" />
        </a>
        <button
          className="text-white md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
        <div className="hidden md:flex items-center gap-x-8">
          {!isLoggedIn && (
            <a href="/" className="text-white/90 hover:text-green-400 transition-colors duration-200">
              Home
            </a>
          )}
          {isLoggedIn && (
            <a href="/dashboard" className="text-white/90 hover:text-green-400 transition-colors duration-200">
              Dashboard
            </a>
          )}
          <button 
            onClick={handleLeaderboardClick} 
            className="text-white/90 hover:text-green-400 transition-colors duration-200"
          >
            Leaderboard
          </button>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 
                     hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-5 h-5 relative"
              animate={{ rotate: isDarkMode ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isDarkMode ? (
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
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
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </motion.div>
          </motion.button>

          <div className="relative group">
            <button
              className="flex items-center focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={postImage.myFile || defaultImage}
                alt="Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
              />
              <svg
                className={`w-4 h-4 ml-2 text-white/90 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`absolute top-12 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-black dark:text-white rounded-lg shadow-lg w-40 py-2 transform transition-all duration-200 ease-in-out ${
                isDropdownOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              {isLoggedIn ? (
                <>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    onClick={goToSettings}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center space-y-6 mt-6 py-6">
          {!isLoggedIn && (
            <li>
              <a href="/" className="text-white/90 hover:text-green-400 transition-colors duration-200">
                Home
              </a>
            </li>
          )}
          <li>
            {isLoggedIn && (
              <a href="/dashboard" className="text-white/90 hover:text-green-400 transition-colors duration-200">
                Dashboard
              </a>
            )}
          </li>
          <li>
            <button 
              onClick={handleLeaderboardClick} 
              className="text-white/90 hover:text-green-400 transition-colors duration-200"
            >
              Leaderboard
            </button>
          </li>
          <li>
            <button 
              className="text-white/90 hover:text-green-400 transition-colors duration-200"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
