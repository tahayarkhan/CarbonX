import React, { useEffect, useState } from 'react';
import defaultImage from '../assets/profile/default.jpg';
import  leaf  from '/leaf.png';
import { useNavigate } from 'react-router-dom'; // Corrected import
import axios from 'axios';

const Navbar = () => {

  const [postImage, setPostImage] = useState({ myFile: "" });

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
        console.error("Error fetching profile picture", error);
      }
    };

    fetchProfilePicture();
  }, []);  // Runs only once when the component mounts


 
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };
    const goToSettings = () => {
        navigate('/settings'); // Redirect to the settings page
    };

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
          console.error("Error fetching profile picture", error);
        }
      };
  
      fetchProfilePicture();
    }, []);  // Runs only once when the component mounts



  return (
    <nav
      className="navbar navbar-expand navbar-light"
      style={{
        backgroundColor: '#000000',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
      }}
    >



      <a
        className="navbar-brand"
        href="#"
        style={{
          marginLeft: '20px',
          fontWeight: 'bold',
          color: '#FFFFFF',
        }}
      >
        Carbon
        <img src={leaf} style={{ width: '30px', height: '30px' }} />
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
    
        <ul
          className="navbar-nav ml-auto"
          style={{
            marginLeft: 'auto',
            marginRight: '20px',
          }}
        >
          <li className="nav-item active">
            <a className="nav-link" href="/" style={{ marginRight: '20px', color: '#FFFFFF' }}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/dashboard" style={{ marginRight: '20px', color: '#FFFFFF' }}>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/rankings" style={{ marginRight: '20px', color: '#FFFFFF' }}>
              Leaderboard
            </a>
          </li>


            <li className="nav-item dropdown">
                
            <img
                src={postImage.myFile || defaultImage}
                className="rounded-circle btn-secondary dropdown-toggle"
                alt="profile"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-haspopup="true" 
                aria-expanded="false"
                style={{
                    width: "40px",
                    height: "40px",
                    cursor: 'pointer',
                }}
            />
                
                <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuLink"
                style={{
                    backgroundColor: '#FFF',
                    color: '#000',
                    borderRadius: '5px',
                    position: 'absolute',
                    top: '50px',
                    right: '0',
                    width: '150px'
                }}
                >
                <a className="dropdown-item" onClick={goToSettings} href="#">
                    Settings
                </a>
                <a className="dropdown-item" onClick={logoutHandler} href="#">
                    Logout
                </a>
                </div>
            </li>


   
        </ul>
      </div>
    </nav>


  )
}

export default Navbar