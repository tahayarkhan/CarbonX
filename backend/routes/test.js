import express from "express";
import { getTest } from "../controllers/test.js";  // Make sure the controller is using `export`

const router = express.Router();

// Correct the route path
router.get('/test', getTest);

export default router;  // Use export default here
