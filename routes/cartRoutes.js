const express = require('express');
const router = express.Router();
const {addToCart , getCartItems,updateCartItems,deleteCartItems,getCartItemFeatures} = require('../services/cartService');


router.post('/', addToCart);
router.get('/', getCartItems);
router.get('/cart_features', getCartItemFeatures);
router.put('/:order_id', updateCartItems);
router.delete('/:order_id', deleteCartItems);



module.exports = router;