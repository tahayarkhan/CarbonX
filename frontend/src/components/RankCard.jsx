import React from "react";
import { Droplet, Zap, Car } from "lucide-react";
import profile from "../assets/profile/profile.png";

const RankCard = () => {
  return (
    <div className="flex items-center p-6 bg-white shadow-md rounded-lg">
      {/* Profile Section */}
      <div className="flex flex-col items-center mr-6">
        <img
          src={profile}
          className="rounded-full"
          alt="profile"
          style={{ width: "100px", height: "100px" }}
        />
        <h5 className="mt-3 text-lg font-semibold text-center">Taha Yar Khan</h5>
      </div>

      {/* Goal and Metrics Section */}
      <div className="flex-grow flex flex-col mx-6">
        <h6 className="text-lg font-medium">Goal: Taking public transit!</h6>
        <div className="flex flex-wrap gap-6 mt-4">
          {/* Metric 1 */}
          <div className="flex items-center gap-2">
            <Droplet size={30} />
            <p className="text-lg font-medium">100 L</p>
          </div>
          {/* Metric 2 */}
          <div className="flex items-center gap-2">
            <Zap size={30} />
            <p className="text-lg font-medium">50 kW</p>
          </div>
          {/* Metric 3 */}
          <div className="flex items-center gap-2">
            <Car size={30} />
            <p className="text-lg font-medium">10 L</p>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <a
        href="#"
        className="ml-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
      >
        View Data
      </a>
    </div>
  );
};

export default RankCard;
