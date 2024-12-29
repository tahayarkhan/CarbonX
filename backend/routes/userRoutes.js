const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUser } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js'); 



router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/').get(getUser);
// router.route('/updateProfilePicture').put(protect, updateProfilePicture);  // Updated to handle profile picture update
// router.route('/profilePicture').get(protect, getProfilePicture);  // New route to fetch profile picture

module.exports = router;
