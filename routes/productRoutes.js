const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsById, deleteProductsById,getProductsByName,addProduct,getAllProductsInAscendingOrder,getAllProductsInDescendingOrder,getAllProductsInAscendingOrderByRating,getAllProductsInDescendingOrderByRating,getAllProductsInDescendingOrderBySize ,getAllProductsInAscendingOrderBySize,getAllProductsBySearch} = require('../services/productService');

router.get('/', getAllProducts);
router.get('/:productid', getProductsById);
router.get('/search/:search', getAllProductsBySearch);
router.post('/', addProduct);

router.get('/priceasc', getAllProductsInAscendingOrder);
router.get('/pricedesc', getAllProductsInDescendingOrder);
router.get('/sizeasc', getAllProductsInAscendingOrderBySize);
router.get('/sizedesc', getAllProductsInDescendingOrderBySize);
router.get('/ratingasc', getAllProductsInAscendingOrderByRating);
router.get('/ratingdesc',getAllProductsInDescendingOrderByRating);
router.get('/product/:productname', getProductsByName);
router.delete('/:productid', deleteProductsById);

module.exports = router;
