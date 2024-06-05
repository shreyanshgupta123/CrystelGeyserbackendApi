const express = require('express');
const router = express.Router();
const {addInvoice,getInvoice,getInvoiceById} = require('../services/invoiceServices');


router.post('/', addInvoice);
router.get('/', getInvoice);
router.get('/:invoice_id', getInvoiceById);
// router.delete('/:order_id', deleteOrdersHistory);



module.exports = router;