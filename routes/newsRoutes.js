const express = require('express');
const router = express.Router();
const {addNews,getNews,getNewsById,deleteNews} = require('../services/newsServices');


router.post('/', addNews);
router.get('/', getNews);
router.get('/:invoice_id', getNewsById);
// // router.put('/:invoice_id', updateReviews);
router.delete('/:invoice_id', deleteNews);



module.exports = router;