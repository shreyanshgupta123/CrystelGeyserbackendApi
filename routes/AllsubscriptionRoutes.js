const express = require('express');
const router = express.Router();
   
    const {createSubscription,getAllSubscription,updateSubscription,getAllSubscriptionById} = require('../services/AllsubscriptionsServices');


router.post('/', createSubscription);
 router.get('/',  getAllSubscription);
 router.get('/:address_id', getAllSubscriptionById);
// router.delete('/:address_id', deleteAlternateAddress);
 router.put('/:order_id', updateSubscription);




module.exports = router;