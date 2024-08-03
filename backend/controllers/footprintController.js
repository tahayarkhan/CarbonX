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
    const footprints = await Footprint.find({ user: req.user._id });
    res.json(footprints);
};

module.exports = { addFootprint, getFootprints };
