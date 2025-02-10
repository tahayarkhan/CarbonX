import express from 'express';
import { addFootprint, getFootprints, getFriendsFootprints } from '../controllers/footprintController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addFootprint).get(protect, getFootprints);

router.get('/friends', protect, getFriendsFootprints);


export default router;
