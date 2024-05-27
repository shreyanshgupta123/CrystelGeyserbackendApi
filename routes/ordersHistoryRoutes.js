const express = require('express');
const router = express.Router();
const {addOrdersHistory,getOrdersHistory,deleteOrdersHistory} = require('../services/ordersHistoryServices');


router.post('/', addOrdersHistory);
router.get('/', getOrdersHistory);
router.delete('/:order_id', deleteOrdersHistory);



module.exports = router;