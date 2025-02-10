import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
import RankCard from "@/components/RankCard";

const Rankings = () => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [username, setUsername] = useState("");
  const [friendsFootprints, setFriendsFootprints] = useState([]);


  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
    fetchFriendsFootprints();
  }, []);




  const fetchFriendsFootprints = async () => {
    try {
        const token = localStorage.getItem("authToken"); // Assuming JWT is stored here
        const { data } = await axios.get("/api/footprints/friends", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setFriendsFootprints(data);
    } catch (error) {
        console.error("Error fetching friends' footprints", error);
    }
  };


  const fetchFriends = async () => {
    const { data } = await axios.get("/api/friends/list", { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } });
    setFriends(data);
  };

  const fetchFriendRequests = async () => {
    const { data } = await axios.get("/api/friends/requests", { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } });
    setFriendRequests(data);
  };

  const sendFriendRequest = async () => {
    await axios.post("/api/friends/send", { username }, { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } });
    alert("Friend request sent!");
    setUsername("");
  };

  const acceptRequest = async (friendId) => {
    await axios.post("/api/friends/accept", { friendId }, { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } });
    fetchFriends();
    fetchFriendRequests();
  };

  const rejectRequest = async (friendId) => {
    await axios.post("/api/friends/reject", { friendId }, { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } });
    fetchFriendRequests();
  };

  return (
  <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-20">
  <Navbar />
      <div className="w-full max-w-4xl mt-16 p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Friend Rankings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Friends</h3>
            {friends.length > 0 ? (
              friends.map(friend => <p key={friend._id} className="p-2 bg-gray-200 rounded-md mb-2">{friend.username}</p>)
            ) : (
              <p className="text-gray-500">No friends yet.</p>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Friend Requests</h3>
            {friendRequests.length > 0 ? (
              friendRequests.map(request => (
                <div key={request._id} className="p-4 bg-gray-200 rounded-md mb-2 flex justify-between items-center">
                  <p>{request.username}</p>
                  <div>
                    <button onClick={() => acceptRequest(request._id)} className="bg-green-500 text-white px-3 py-1 rounded-md mr-2">Accept</button>
                    <button onClick={() => rejectRequest(request._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Reject</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No friend requests.</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex items-center space-x-2">
          <input type="text" placeholder="Add friend by username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 rounded-md w-full" />
          <button onClick={sendFriendRequest} className="bg-blue-500 text-white px-4 py-2 rounded-md">Send</button>
        </div>
      </div>

      


     
      <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Friends Leaderboard</h2>
            <div className="space-y-4">
                {friendsFootprints.length > 0 ? (
                    friendsFootprints.map((footprint) => (
                        <RankCard
                            key={footprint._id}
                            name={footprint.user.name}
                            profilePicture={footprint.user.profilePicture}
                            waterUsage={footprint.waterUsage}
                            electricityUsage={footprint.electricityUsage}
                            carUsage={footprint.carUsage}
                        />
                    ))
                ) : (
                    <p>No footprints data available for friends.</p>
                )}
            </div>
        </div>










    </div>
  );
};

export default Rankings;
