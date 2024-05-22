const express = require('express');
const router = express.Router();
const {addCurrentOrders,getCurrentOrders,deleteCurrentOrder} = require('../services/currentOrdersServices');


router.post('/', addCurrentOrders);
router.get('/', getCurrentOrders);
router.delete('/:order_id', deleteCurrentOrder);




module.exports = router;