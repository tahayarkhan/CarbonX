
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
import RankCard from "@/components/RankCard";
import Top3BarChart from "@/components/Top3BarChart";
import { User, UserPlus, UserMinus, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';

import {
  fetchUserFootprint as getUserFootprintAPI,
  fetchFriendsFootprints as getFriendsFootprintsAPI,
  fetchGeneralLeaderboard as getGeneralLeaderboardAPI,
  fetchFriends as getFriendsAPI,
  fetchFriendRequests as getFriendRequestsAPI,
  sendFriendRequest as sendFriendRequestAPI,
  acceptFriendRequest as acceptFriendRequestAPI,
  rejectFriendRequest as rejectFriendRequestAPI,
} from "@/services/api";

const SkeletonCard = () => (
  <div className="animate-pulse flex items-center justify-between bg-white shadow-sm border border-zinc-100 rounded-xl p-4 mb-3">
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-zinc-200" />
      <div className="h-4 w-24 bg-zinc-200 rounded" />
    </div>
  </div>
);

const SkeletonRankCard = () => (
  <div className="animate-pulse bg-white shadow-sm border border-zinc-100 rounded-xl p-4 mb-3">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 rounded-full bg-zinc-200" />
      <div className="h-4 w-32 bg-zinc-200 rounded" />
    </div>
    <div className="space-y-2">
      <div className="h-3 w-full bg-zinc-200 rounded" />
      <div className="h-3 w-3/4 bg-zinc-200 rounded" />
      <div className="h-3 w-2/3 bg-zinc-200 rounded" />
    </div>
  </div>
);


const Rankings = () => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [username, setUsername] = useState("");
  const [globalFootprints, setGlobalFootprints] = useState([]);
  const [friendsFootprints, setFriendsFootprints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFootprint, setUserFootprint] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
  const [isLoadingFriends, setIsLoadingFriends] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const getUniqueUsers = (footprints) => {
    const uniqueUsers = new Map();
    
    footprints.forEach(footprint => {
      if (!footprint || !footprint.user || !footprint.user._id) return;
      
      // If we haven't seen this user before or if this footprint has a better score
      if (!uniqueUsers.has(footprint.user._id) || 
          footprint.score < uniqueUsers.get(footprint.user._id).score) {
        uniqueUsers.set(footprint.user._id, footprint);
      }
    });
    
    return Array.from(uniqueUsers.values());
  };

  const fetchUserFootprint = async () => {
    try {
      const data = await getUserFootprintAPI();
      if (data && Array.isArray(data)) {
        // Get the user's best (lowest) score from all their footprints
        const bestFootprint = data.reduce((best, current) => {
          if (!best || current.score < best.score) return current;
          return best;
        }, null);
        return bestFootprint;
      }
      return data;
    } catch (error) {
      console.error("Error fetching user footprint", error);
      setError("Failed to load user footprint");
      return null;
    }
  };

  const fetchFriendsFootprints = async (userFootprintData) => {
    setIsLoadingFriends(true);
    try {
      const  data  = await getFriendsFootprintsAPI();
      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format received");
      }
      
      // Get unique users and sort by score
      const uniqueFootprints = getUniqueUsers(data);
      const sortedData = uniqueFootprints.sort((a, b) => a.score - b.score);
      
      // Always include the user's best footprint in the friends leaderboard
      if (userFootprintData) {
        // Remove the user's footprint if it exists in the friends list
        const filteredFriends = sortedData.filter(
          footprint => footprint.user._id !== userFootprintData.user._id
        );
        // Add the user's best footprint
        const combinedFootprints = [...filteredFriends, userFootprintData];
        const finalSortedData = combinedFootprints.sort((a, b) => a.score - b.score);
        setFriendsFootprints(finalSortedData);
      } else {
        setFriendsFootprints(sortedData);
      }
    } catch (error) {
      console.error("Error fetching friends' footprints", error);
      if (error.response?.status === 404) {
        // If no friends but we have user footprint, show just the user's footprint
        if (userFootprintData) {
          setFriendsFootprints([userFootprintData]);
        } else {
          setFriendsFootprints([]);
        }
      } else {
        setError("Failed to load friends' footprints");
        setFriendsFootprints([]);
      }
    } finally {
      setIsLoadingFriends(false);
    }
  };

  const fetchGeneralLeaderboard = async () => {
    setIsLoadingGlobal(true);
    console.log("Fetching leaderboard data...");
    try {
      // Make the API request
      const data  = await getGeneralLeaderboardAPI();
      


      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format received");
      }
  
      // Get unique users and sort by score
      const uniqueFootprints = getUniqueUsers(data);
  
      const sortedData = uniqueFootprints.sort((a, b) => a.score - b.score);
  
      // Set state with sorted data
      setGlobalFootprints(sortedData);
    } catch (error) {
      console.error("Error fetching general leaderboard", error);
      setError("Failed to load global leaderboard");
      setGlobalFootprints([]);
    } finally {
      setIsLoadingGlobal(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (isLoggedIn) {
          // First fetch user's footprint
          const userFootprintData = await fetchUserFootprint();
          setUserFootprint(userFootprintData);
          
          // Then fetch friends' footprints and combine with user's footprint
          await fetchFriendsFootprints(userFootprintData);
          
          // Finally fetch friends and friend requests
          await Promise.all([
            fetchFriends(),
            fetchFriendRequests()
          ]);
        } else {
          // Only fetch general leaderboard data if not logged in
          await fetchGeneralLeaderboard();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load leaderboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const fetchFriends = async () => {
    const  data  = await getFriendsAPI();
    setFriends(data);
  };

  const fetchFriendRequests = async () => {
    const  data  = await getFriendRequestsAPI();
    setFriendRequests(data);
  };

  const sendFriendRequest = async () => {
    await sendFriendRequestAPI();
    toast.success("Friend request sent!");
    setUsername("");
  };

  const acceptRequest = async (friendId) => {
    await acceptFriendRequestAPI();
    fetchFriends();
    fetchFriendRequests();
  };

  const rejectRequest = async (friendId) => {
    await rejectFriendRequestAPI();
    fetchFriendRequests();
  };

  return (



    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-green-600 via-green-500 to-emerald-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      
      <Navbar />
      
      <motion.div 
          className="backdrop-blur-md bg-white/40 dark:bg-gray-900/40 p-10 rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/40 w-full max-w-4xl mx-auto my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
      
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}
 
        
        {isLoggedIn && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-6 w-6 text-white" />
                  <h3 className="text-xl font-semibold text-white">Friends</h3>
                </div>
                <AnimatePresence>
                  {isLoading ? (
                    Array(3).fill(0).map((_, index) => <SkeletonCard key={index} />)
                  ) : friends.length > 0 ? (
                    friends.map((friend, index) => (
                      <motion.div
                        key={friend._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                        className="flex items-center justify-between bg-white shadow-sm border border-zinc-100 rounded-xl p-4 mb-3 
                                 hover:shadow-md hover:border-blue-100 transition-all duration-300 ease-in-out"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="font-medium text-zinc-800">{friend.username}</div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-6 bg-zinc-50 rounded-xl border border-zinc-100"
                    >
                      <UserPlus className="h-8 w-8 text-white mx-auto mb-2" />
                      <p className="text-white">No friends yet. Add some to see their rankings!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <UserPlus className="h-6 w-6 text-white" />
                  <h3 className="text-xl font-semibold text-white">Friend Requests</h3>
                </div>
                <AnimatePresence>
                  {isLoading ? (
                    Array(2).fill(0).map((_, index) => <SkeletonCard key={index} />)
                  ) : friendRequests.length > 0 ? (
                    friendRequests.map((request, index) => (
                      <motion.div
                        key={request._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                        className="flex items-center justify-between bg-white shadow-sm border border-zinc-100 rounded-xl p-4 mb-3 
                                 hover:shadow-md hover:border-blue-100 transition-all duration-300 ease-in-out"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="font-medium text-zinc-800">{request.username}</div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => acceptRequest(request._id)} 
                            className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-full transition-all duration-300 ease-in-out
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Check size={20} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => rejectRequest(request._id)} 
                            className="text-rose-600 hover:bg-rose-50 p-2 rounded-full transition-all duration-300 ease-in-out
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <X size={20} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-6 bg-zinc-50 rounded-xl border border-zinc-100"
                    >
                      <UserMinus className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
                      <p className="text-zinc-500">No pending friend requests.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 bg-white shadow-sm p-2 rounded-xl w-full border border-zinc-100
                         focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center gap-2 flex-1">
                  <UserPlus className="h-5 w-5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Add friend by username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 px-2 py-2 border-none focus:outline-none text-zinc-800 placeholder-zinc-400"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={sendFriendRequest}
                  disabled={!username.trim()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                            ${username.trim() 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-zinc-100 text-zinc-400 cursor-not-allowed opacity-50'}`}
                >
                  <UserPlus size={18} />
                  <span className="font-medium">Send Request</span>
                </motion.button>
              </motion.div>
              {username && !username.trim() && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-rose-500 text-sm mt-2"
                >
                  Please enter a valid username
                </motion.p>
              )}
            </div>
          </>
        )}

        <div className="my-8">
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <User className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-semibold text-white">
              {isLoggedIn ? "Friends Leaderboard" : "Global Leaderboard"}
            </h2>
          </div>
          
          {/* Top 3 Bar Chart - Show for both leaderboards */}
          {isLoggedIn ? (
            isLoadingFriends ? (
              <div className="h-[220px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : friendsFootprints.length > 0 ? (
              <Top3BarChart top3={friendsFootprints.slice(0, 3)} />
            ) : null
          ) : (
            isLoadingGlobal ? (
              <div className="h-[220px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : globalFootprints.length > 0 ? (
              <Top3BarChart top3={globalFootprints.slice(0, 3)} />
            ) : null
          )}

          
          <div className="space-y-4">
            {isLoading ? (
              Array(3).fill(0).map((_, index) => <SkeletonRankCard key={index} />)
            ) : (
              <>
                {isLoggedIn ? (
                  // Friends Leaderboard (including user's footprint)
                  isLoadingFriends ? (
                    Array(3).fill(0).map((_, index) => <SkeletonRankCard key={index} />)
                  ) : friendsFootprints.length > 0 ? (
                    friendsFootprints.slice(0, 10).map((footprint, index) => {
                      if (!footprint || !footprint.user) return null;
                      
                      const isTop3 = index < 3;
                      const top3Styles = [
                        'border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] rounded-2xl', // Gold
                        'border-2 border-zinc-300 shadow-[0_0_15px_rgba(161,161,170,0.3)] rounded-2xl', // Silver
                        'border-2 border-amber-600 shadow-[0_0_15px_rgba(180,83,9,0.3)] rounded-2xl'    // Bronze
                      ];
                      
                      return (
                        <div key={footprint._id} className="flex items-center gap-4 w-full">
                          <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                            isTop3 ? top3Styles[index] : 'bg-blue-50'
                          }`}>
                            <span className={`font-semibold ${
                              isTop3 
                                ? index === 0 ? 'text-amber-600' 
                                  : index === 1 ? 'text-zinc-600' 
                                  : 'text-amber-700'
                                : 'text-blue-600'
                            }`}>
                              {index + 1}
                            </span>
                          </div>
                          <div className={`flex-1 ${
                            isTop3 ? 'transform hover:scale-[1.02] transition-transform duration-200' : ''
                          }`}>
                            <div className={isTop3 ? top3Styles[index] : ''}>
                              <RankCard
                                name={footprint.user.name || 'Anonymous'}
                                profilePicture={footprint.user.profilePicture}
                                waterUsage={footprint.waterUsage}
                                electricityUsage={footprint.electricityUsage}
                                carUsage={footprint.carUsage}
                                score={footprint.score}
                              />
                            </div>
                          </div>
                        </div>

                      );
                    })
                  ) : (
                    <div className="text-center py-12 bg-zinc-50 rounded-xl border border-zinc-100">
                      <UserPlus className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-zinc-800 mb-2">No Friends Yet</h3>
                      <p className="text-zinc-500">Add some friends to see their rankings!</p>
                    </div>
                  )
                ) : (

                  

                
                  
                  
                  
                  // Global Leaderboard
                  isLoadingGlobal ? (
                    Array(3).fill(0).map((_, index) => <SkeletonRankCard key={index} />)
                  ) : (
                    globalFootprints.slice(0, 10).map((footprint, index) => {
                      if (!footprint || !footprint.user) return null;
                      
                      const isTop3 = index < 3;
                      const top3Styles = [
                        'border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] rounded-2xl', // Gold
                        'border-2 border-zinc-300 shadow-[0_0_15px_rgba(161,161,170,0.3)] rounded-2xl', // Silver
                        'border-2 border-amber-600 shadow-[0_0_15px_rgba(180,83,9,0.3)] rounded-2xl'    // Bronze
                      ];
                      
                      return (
                        <div key={footprint._id} className="flex items-center gap-4 w-full">
                          <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                            isTop3 ? top3Styles[index] : 'bg-blue-50'
                          }`}>
                            <span className={`font-semibold ${
                              isTop3 
                                ? index === 0 ? 'text-amber-600' 
                                  : index === 1 ? 'text-zinc-600' 
                                  : 'text-amber-700'
                                : 'text-blue-600'
                            }`}>
                              {index + 1} 
                            </span>
                          </div>
                          <div className={`flex-1 ${
                            isTop3 ? 'transform hover:scale-[1.02] transition-transform duration-200' : ''
                          }`}>
                            <div className={isTop3 ? top3Styles[index] : ''}>
                              <RankCard
                                name={footprint.user.name || 'Anonymous'}
                                profilePicture={footprint.user.profilePicture}
                                waterUsage={footprint.waterUsage}
                                electricityUsage={footprint.electricityUsage}
                                carUsage={footprint.carUsage}
                                score={footprint.score}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )
                )}
              </>
            )}
          </div>
        </div>
      </motion.div> 
    </div>
  );
};

export default Rankings;

