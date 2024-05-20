const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
// Additional routes like getProductById, createProduct, etc.

module.exports = router;
