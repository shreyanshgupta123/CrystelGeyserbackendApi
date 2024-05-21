const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsById, deleteProductsById,getProductsByName,addProduct } = require('../services/productService');

router.get('/', getAllProducts);
router.post('/', addProduct);
router.get('/:productid', getProductsById);
router.get('/product/:productname', getProductsByName);
router.delete('/:productid', deleteProductsById);

module.exports = router;
