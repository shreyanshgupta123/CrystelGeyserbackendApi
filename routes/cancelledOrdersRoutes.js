const express = require('express');
const router = express.Router();
const {addCancelledOrders,getCancelledOrders,deleteCancelledOrders, getCancelledOrderById} = require('../services/cancelledOrdersServices');


router.post('/', addCancelledOrders);
router.get('/', getCancelledOrders);
router.get('/:order_id', getCancelledOrderById);
router.delete('/:order_id', deleteCancelledOrders);





module.exports = router;