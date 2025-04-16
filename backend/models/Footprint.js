import mongoose from 'mongoose';

const footprintSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    waterUsage: { type: Number, required: true },
    electricityUsage: { type: Number, required: true },
    carUsage: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

// Add a virtual field for the score
footprintSchema.virtual('score').get(function() {
    return Math.round((this.waterUsage + this.electricityUsage + this.carUsage) / 3);
});

// Ensure virtual fields are included when converting to JSON
footprintSchema.set('toJSON', { virtuals: true });
footprintSchema.set('toObject', { virtuals: true });

const Footprint = mongoose.model('Footprint', footprintSchema);

export default Footprint;
