import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

const token = () => localStorage.getItem("authToken");

const authHeader = () => ({
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });


  export const fetchProfilePhoto = async() => {

    const data = axios.get(`${API_URL}/api/users/profilePicture`, authHeader());
    return data;
  }

  export const uploadPhoto = async(userData) => {
    axios.post(`${API_URL}/api/users/upload`, userData, authHeader());
  };


  export const userRegister = async({ name, email, username, password }) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`${API_URL}/api/users`, { name, email, username, password }, config);
    return data;
  };


  export const userLogin = async({ email, password }) => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    const { data } = await axios.post(`${API_URL}/api/users/login`,  { email, password }, config);
    return data;
  };

  export const submitFootprintData = async ({ waterUsage, electricityUsage, carUsage }) => {
    await axios.post(`${API_URL}/api/footprints`, { waterUsage, electricityUsage, carUsage }, authHeader());
  };


  export const fetchUserFootprint = async () => {
    const { data } = await axios.get(`${API_URL}/api/footprints/user`, authHeader());
    return data; 
  };
  
  export const fetchFriendsFootprints = async () => {
    const { data } = await axios.get(`${API_URL}/api/footprints/friends`, authHeader());
    return data;
  };
  
  export const fetchGeneralLeaderboard = async () => {
    const { data } = await axios.get(`${API_URL}/api/footprints/leaderboard`);
    return data;
  };
  
  // Friends
  export const fetchFriends = async () => {
    const { data } = await axios.get(`${API_URL}/api/friends/list`, authHeader());
    return data;
  };
  
  export const fetchFriendRequests = async () => {
    const { data } = await axios.get(`${API_URL}/api/friends/requests`, authHeader());
    return data;
  };
  
  export const sendFriendRequest = async (username) => {
    await axios.post(`${API_URL}/api/friends/send`, { username }, authHeader());
  };
  
  export const acceptFriendRequest = async (friendId) => {
    await axios.post(`${API_URL}/api/friends/accept`, { friendId }, authHeader());
  };
  
  export const rejectFriendRequest = async (friendId) => {
    await axios.post(`${API_URL}/api/friends/reject`, { friendId }, authHeader());
  };


