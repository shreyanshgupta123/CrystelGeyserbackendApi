const express = require('express');
const router = express.Router();
const {addReturnJarRequest,getReturnJarRequest,getReturnJarRequestById,updateReturnJarRequests,deleteReturnJarRequests} = require('../services/returnjarrequestServices');


router.post('/', addReturnJarRequest);
router.get('/', getReturnJarRequest);
router.get('/:invoice_id', getReturnJarRequestById);
router.put('/:invoice_id', updateReturnJarRequests);
router.delete('/:invoice_id', deleteReturnJarRequests);



module.exports = router;