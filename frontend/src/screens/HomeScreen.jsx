import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-green-500 bg-gradient-to-t from-green-500 via-green-500 to-black bg-cover bg-center">
      <Navbar />
      <div className="flex flex-col items-center text-center w-full space-y-6">
        <h2 className="text-5xl font-bold text-white">Carbon X</h2>
        <div className="rounded-full shadow-lg max-w-2xl p-6 bg-white">
          <Link
            to="/register"
            className="block w-full text-center py-3 px-6 bg-green-600 text-white font-bold text-lg rounded-full hover:bg-green-700 transition duration-300"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
