const express = require('express');
const router = express.Router();
const {addOrders,getOrders,deleteOrders} = require('../services/ordersServices');


router.post('/', addOrders);
router.get('/', getOrders);
router.delete('/:order_id', deleteOrders);



module.exports = router;