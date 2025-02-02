const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Correct import
const authMiddleware = require('../middleware/authMiddleware');

// Use the correct function from productController
router.get('/:barcode', authMiddleware, productController.getProductByBarcode);

module.exports = router;
