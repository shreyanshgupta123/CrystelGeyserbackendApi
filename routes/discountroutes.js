const express = require('express');
const router = express.Router();
const userController = require('../services/discountServices');


router.post('/', userController.createDiscount);
 router.put('/:order_id', userController.updateDiscount);
 router.delete('/:discount_id', userController.deletediscount);
 router.get('/:discount_id', userController.getDiscountById);
router.get('/', userController.getDiscounts);
// router.post('/login', userController.getUserDetailsByName);


module.exports = router;