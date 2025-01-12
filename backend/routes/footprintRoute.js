import express from 'express';
import { addFootprint, getFootprints } from '../controllers/footprintController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addFootprint).get(protect, getFootprints);

export default router;
