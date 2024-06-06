const express = require('express');
const router = express.Router();
const {addFeedback,getFeedback,getFeedbackById} = require('../services/feedbackServices');


router.post('/', addFeedback);
 router.get('/', getFeedback);
 router.get('/:invoice_id', getFeedbackById);
// router.delete('/:order_id', deleteOrdersHistory);



module.exports = router;