const express = require('express');
const router = express.Router();
const { addFootprint, getFootprints } = require('../controllers/footprintController.js');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addFootprint).get(protect, getFootprints);

module.exports = router;
