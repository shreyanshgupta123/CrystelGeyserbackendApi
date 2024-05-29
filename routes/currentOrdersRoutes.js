const express = require('express');
const router = express.Router();
const {addCurrentOrders,getCurrentOrders,deleteCurrentOrder, getCurrentOrderById} = require('../services/currentOrdersServices');


router.post('/', addCurrentOrders);
router.get('/', getCurrentOrders);
router.get('/:order_id', getCurrentOrderById);
router.delete('/:order_id', deleteCurrentOrder);




module.exports = router;