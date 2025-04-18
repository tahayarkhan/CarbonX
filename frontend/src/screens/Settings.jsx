import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import defaultImage from '../assets/profile/default.jpg';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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
          const response = await axios.get('${API_URL}/api/users/profilePicture', { headers });
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

      await axios.post('${API_URL}/api/users/upload', userData, { headers });
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/70 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-8 flex flex-col items-center transition-all duration-300 ease-in-out hover:shadow-green-200"
      >
        <div className="flex flex-col items-center">
          <label htmlFor="file-upload" className="cursor-pointer">
            <img
              src={postImage.myFile || defaultImage}
              alt="profile"
              className="rounded-full object-cover w-48 h-48 ring-4 ring-green-300 hover:scale-105 hover:ring-green-500 transition-transform duration-300 ease-in-out shadow-md"
            />
          </label>

          <input
            type="file"
            name="myFile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            className="hidden"
            onChange={handleFileUpload}
          />

          <label
            htmlFor="file-upload"
            className="mt-4 inline-block cursor-pointer px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm font-medium rounded-md shadow transition-all duration-200"
          >
            Change Profile Picture
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 bg-green-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
        >
          Save Changes
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
