const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }


    const user = await User.create({ name, email, password });

    if (user) {
        const token = generateToken(user._id); // Generate the token
        console.log(`Generated token for user ${user.name}: ${token}`); // Log the token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

const getUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {x
        res.status(500).json({ message: 'Error fetching users' });
    }
};

module.exports = { registerUser, authUser, getUser};
