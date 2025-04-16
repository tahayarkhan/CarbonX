import express from 'express';
import { addFootprint, getAllFootprints, getFootprints, getFriendsFootprints } from '../controllers/footprintController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for getting all footprints
router.get('/leaderboard', getAllFootprints);

// Protected routes
router.route('/').post(protect, addFootprint).get(protect, getFootprints);
router.get('/user', protect, getFootprints)
router.get('/friends', protect, getFriendsFootprints);

export default router;
