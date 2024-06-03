const express = require('express');
const router = express.Router();
const {forgetpassword,resetPassword} = require('../services/forgetPasswordServices');


router.post('/', forgetpassword);
router.post('/resetpassword', resetPassword);
// router.get('/', getOrdersHistory);
// router.delete('/:order_id', deleteOrdersHistory);



module.exports = router;