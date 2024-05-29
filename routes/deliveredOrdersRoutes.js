const express = require('express');
const router = express.Router();
const {addDeliveredOrders,getdeliveredOrders,deleteDeliveredOrder, getDeliveredOrderById} = require('../services/deliveredOrdersService');


router.post('/', addDeliveredOrders);
router.get('/', getdeliveredOrders);
router.get('/:order_id', getDeliveredOrderById);
router.delete('/:order_id', deleteDeliveredOrder);




module.exports = router;