const express = require('express');
const router = express.Router();
const {addCancelledOrders,getCancelledOrders,deleteCancelledOrders} = require('../services/cancelledOrdersServices');


router.post('/', addCancelledOrders);
router.get('/', getCancelledOrders);
router.delete('/:order_id', deleteCancelledOrders);




module.exports = router;