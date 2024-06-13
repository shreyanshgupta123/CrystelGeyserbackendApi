const express = require('express');
const router = express.Router();
const {addRefferal,getRefferal,getRefferalById,deleteRefferal} = require('../services/refferalServices');


router.post('/', addRefferal);
router.get('/', getRefferal);
router.get('/:invoice_id', getRefferalById);
// router.put('/:invoice_id', updateReviews);
router.delete('/:invoice_id', deleteRefferal);



module.exports = router;