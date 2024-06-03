const express = require('express');
const router = express.Router();
const {forgetpassword} = require('../services/forgetPasswordServices');


router.post('/', forgetpassword);
// router.get('/', getOrdersHistory);
// router.delete('/:order_id', deleteOrdersHistory);



module.exports = router;