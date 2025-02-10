import Footprint from '../models/Footprint.js';
import User from '../models/User.js';

export const addFootprint = async (req, res) => {
    const { waterUsage, electricityUsage, carUsage } = req.body;

    const footprint = new Footprint({
        user: req.user._id,
        waterUsage,
        electricityUsage,
        carUsage,
    });

    const createdFootprint = await footprint.save();

    res.status(201).json(createdFootprint);
};

export const getFootprints = async (req, res) => {
    try {
        // Fetch footprints and populate user information
        const footprints = await Footprint.find({ user: req.user._id })
            .populate('user', 'name') // Assuming the User model has a 'name' field
            .exec();

        res.json(footprints);
    } catch (error) {
        res.status(500).json({ message: "Error fetching footprints", error: error.message });
    }
};


export const getFriendsFootprints = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('friends'); // Assuming friends are stored as user references

        if (!user || !user.friends.length) {
            return res.status(404).json({ message: "No friends found" });
        }

        // Get footprints for friends
        const footprints = await Footprint.find({ user: { $in: user.friends.map(friend => friend._id) } })
            .populate('user', 'name profilePicture') // Assuming User model has profilePicture
            .exec();

        res.json(footprints);

    } catch (error) {
        res.status(500).json({ message: "Error fetching friends' footprints", error: error.message });
    }
};
