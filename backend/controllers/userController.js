import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';  // Import correctly based on your project structure
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import jwt from 'jsonwebtoken';


// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, username, password } = req.body;

    const userExists = await User.findOne({ email });
    const userNameExists = await User.findOne({ username });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    if (userNameExists) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const user = await User.create({
        name,
        email,
        username,
        password,
    });

    if (user) {
        const token = generateToken(user._id);
        console.log(`Generated token for user ${user.name}: ${token}`);
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            token: token,
        });
    } else {
        return res.status(400).json({ message: 'Invalid user data' });
    }
};

// Authenticate a user
export const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        return res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Get all users
export const getUser = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users' });
    }
};



export const uploadPicture = async (req, res) => {
    const { myFile } = req.body; // The base64 string sent from the frontend
  
    if (!myFile) {
      return res.status(400).json({ message: "No image provided" });
    }
  
    try {
      // Verify the token and extract user data
      const token = req.headers.authorization?.split(' ')[1]; // Bearer token
      if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      const userId = decoded.id; // Assuming token contains user ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the user's profile picture
      user.profilePicture = myFile;
  
      await user.save();
  
      return res.status(200).json({
        message: 'Profile picture updated successfully',
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error processing the image" });
    }
  };



  export const getProfilePicture = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Ensure user ID is decoded from the token
        if (user) {
            return res.status(200).json({ profilePicture: user.profilePicture });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
