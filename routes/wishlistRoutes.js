const express = require('express');
const router = express.Router();
const {createWishlist,getWishlist,deleteWishlist} = require('../services/wishlistServices');


router.post('/', createWishlist);
router.get('/', getWishlist);
router.delete('/:order_id', deleteWishlist);




module.exports = router;