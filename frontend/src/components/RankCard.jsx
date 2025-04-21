import React from "react";
import { Droplet, Zap, Car } from "lucide-react";

const RankCard = ({ name, profilePicture, waterUsage, electricityUsage, carUsage, score }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center sm:justify-between p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
            {/* Profile Section */}
            <div className="flex items-center gap-4 sm:min-w-[200px] mb-4 sm:mb-0">
                <img
                    src={profilePicture || "/default-profile.png"}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    alt="profile"
                />
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[120px]">{name}</h5>
            </div>

            {/* Metrics */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 text-gray-700 dark:text-gray-100">
                <div className="flex items-center gap-2">
                    <Droplet size={24} className="text-blue-400" />
                    <p className="text-base">{waterUsage} L</p>
                </div>
                <div className="flex items-center gap-2">
                    <Zap size={24} className="text-yellow-400" />
                    <p className="text-base">{electricityUsage} kW</p>
                </div>
                <div className="flex items-center gap-2">
                    <Car size={24} className="text-red-400" />
                    <p className="text-base">{carUsage} L</p>
                </div>
            </div>

            {/* Score */}
            <div className="text-center sm:text-left sm:px-4 mt-4 sm:mt-0">
                <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase">Score</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}</span>
            </div>
        </div>
    );
};

export default RankCard;
