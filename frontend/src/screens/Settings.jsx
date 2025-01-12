import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import defaultImage from '../assets/profile/default.jpg';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const url = "http://localhost:8080/api/users/";

const Settings = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      myFile: postImage.myFile // Only include the image (profile picture) here
    };
  
    try {
      const token = localStorage.getItem('authToken'); // Assuming you store the JWT token in localStorage
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      await axios.post('http://localhost:8080/api/users/upload', userData, { headers });
      console.log("Profile picture updated successfully");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
    console.log(base64);
  };

  return (

    
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
      <Navbar />
          
          <form onSubmit={handleSubmit} className="text-center">
            

          <div class="form-group text-center">
            <label htmlFor="file-upload">
              
              <img
                src={postImage.myFile || defaultImage}
                class="img-responsive rounded-circle object-fit-cover"
                alt="profile"
                style={{ width: "200px", height: "200px" }}
              />

            </label>

            
              <input
                type="file"
                label="Image"
                name="myFile"
                id="file-upload"
                accept=".jpeg, .png, .jpg"
                className="form-control mt-4"
                onChange={handleFileUpload}
              />

              </div>
            

            <h3>taha.yar</h3>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>


          </form>
  
    </div>
  );
};

export default Settings;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
