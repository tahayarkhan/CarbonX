import React from "react";
import { Droplet, Zap, Car } from "lucide-react";

const RankCard = ({ name, profilePicture, waterUsage, electricityUsage, carUsage, score }) => {
    return (
        <div className="flex items-center p-6 bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300">
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

            {/* Score Section */}
            <div className="ml-6 flex flex-col items-center">
                <span className="text-sm text-gray-500">Score</span>
                <span className="text-3xl font-bold text-blue-600">{score}</span>
            </div>
        </div>
    );
};

export default RankCard;
