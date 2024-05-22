const express = require('express');
const router = express.Router();
const {addToCart , getCartItems,updateCartItems,deleteCartItems} = require('../services/cartService');


router.post('/', addToCart);
router.get('/', getCartItems);
router.put('/:order_id', updateCartItems);
router.delete('/:order_id', deleteCartItems);



module.exports = router;