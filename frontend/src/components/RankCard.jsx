import React from "react";
import { Droplet, Zap, Car } from "lucide-react";

const RankCard = ({ name, profilePicture, waterUsage, electricityUsage, carUsage }) => {
    return (
        <div className="flex items-center p-6 bg-white shadow-md rounded-lg">
            {/* Profile Section */}
            <div className="flex flex-col items-center mr-6">
                <img
                    src={profilePicture || "/default-profile.png"} 
                    className="rounded-full"
                    alt="profile"
                    style={{ width: "100px", height: "100px" }}
                />
                <h5 className="mt-3 text-lg font-semibold text-center">{name}</h5>
            </div>

            {/* Goal and Metrics Section */}
            <div className="flex-grow flex flex-col mx-6">
                <h6 className="text-lg font-medium">Goal: Reducing carbon footprint</h6>
                <div className="flex flex-wrap gap-6 mt-4">
                    <div className="flex items-center gap-2">
                        <Droplet size={30} />
                        <p className="text-lg font-medium">{waterUsage} L</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap size={30} />
                        <p className="text-lg font-medium">{electricityUsage} kW</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Car size={30} />
                        <p className="text-lg font-medium">{carUsage} L</p>
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
