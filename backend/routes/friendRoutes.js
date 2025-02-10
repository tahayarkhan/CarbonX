import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getFriends, getFriendRequests } from '../controllers/friendController.js';

const router = express.Router();

router.post('/send', protect, sendFriendRequest);
router.post('/accept', protect, acceptFriendRequest);
router.post('/reject', protect, rejectFriendRequest);
router.get('/list', protect, getFriends);
router.get('/requests', protect, getFriendRequests);

export default router;
