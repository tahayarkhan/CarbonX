// routes/userRoutes.js
import express from 'express';
import { registerUser, authUser, getUser, uploadPicture, getProfilePicture } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/').get(getUser);
router.route('/').get(getProfilePicture);
router.post('/upload', protect, uploadPicture);
router.route('/profilePicture').get(protect, getProfilePicture);  // Protect this route



// router.route('/updateProfilePicture').put(protect, updateProfilePicture);  // Updated to handle profile picture update
// router.route('/profilePicture').get(protect, getProfilePicture);  // New route to fetch profile picture

export default router;  // Use export default here
