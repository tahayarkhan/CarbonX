const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

// Register a new user
const registerUser = async (req, res) => {
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
const authUser = async (req, res) => {
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
const getUser = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users' });
    }
};







module.exports = { registerUser, authUser, getUser };
