import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import defaultImage from '../assets/profile/default.jpg';
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      myFile: postImage.myFile
    };

    try {
      const token = localStorage.getItem('authToken');
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />

      <form onSubmit={handleSubmit} className="text-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex flex-col items-center">
          <label htmlFor="file-upload" className="cursor-pointer">
            <img
              src={postImage.myFile || defaultImage}
              alt="profile"
              className="rounded-full object-cover w-48 h-48"
            />
          </label>

          <input
            type="file"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            className="mt-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500"
            onChange={handleFileUpload}
          />
        </div>

        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        >
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
