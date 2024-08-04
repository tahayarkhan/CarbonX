const mongoose = require('mongoose');

const footprintSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    waterUsage: { type: Number, required: true },
    electricityUsage: { type: Number, required: true },
    carUsage: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const Footprint = mongoose.model('Footprint', footprintSchema);




module.exports = Footprint;
