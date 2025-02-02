const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/', authMiddleware, profileController.updateProfile);

module.exports = router;
