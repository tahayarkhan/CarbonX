const express = require("express");
const router = express.Router();
const { getTest } = require("../controllers/test");

// Correct the route path
router.get('/test', getTest);

module.exports = router;
