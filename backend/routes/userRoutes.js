const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUser } = require('../controllers/userController.js');

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/').get(getUser);
module.exports = router;
