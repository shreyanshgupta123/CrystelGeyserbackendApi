const express = require('express');
const router = express.Router();
   
    const {createSubscription,getAllSubscription,updateSubscription,getAllSubscriptionById} = require('../services/AllsubscriptionsServices');


router.post('/', createSubscription);
 router.get('/',  getAllSubscription);
 router.get('/:subscription_id', getAllSubscriptionById);
// router.delete('/:address_id', deleteAlternateAddress);
 router.put('/:subscription_id', updateSubscription);




module.exports = router;