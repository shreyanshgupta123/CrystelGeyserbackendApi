const express = require('express');
const router = express.Router();
const {addReviews,getReviews,getReviewById,updateReviews,deleteReview} = require('../services/reviewServices');


router.post('/', addReviews);
router.get('/', getReviews);
router.get('/:invoice_id', getReviewById);
router.put('/:invoice_id', updateReviews);
router.delete('/:invoice_id', deleteReview);



module.exports = router;