const Footprint = require('../models/Footprint');

const addFootprint = async (req, res) => {
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

const getFootprints = async (req, res) => {
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

module.exports = { addFootprint, getFootprints };
