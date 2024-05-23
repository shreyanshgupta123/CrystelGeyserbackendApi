const express = require('express');
const router = express.Router();
const {addDeliveredOrders,getdeliveredOrders,deleteDeliveredOrder} = require('../services/deliveredOrdersService');


router.post('/', addDeliveredOrders);
router.get('/', getdeliveredOrders);
router.delete('/:order_id', deleteDeliveredOrder);




module.exports = router;