const express = require('express');
const router = express.Router();
   
    const {createActiveSubscription,getActiveSubscription,getActiveSubscriptionById} = require('../services/activesubscriptionServices');


router.post('/', createActiveSubscription);
 router.get('/',  getActiveSubscription);
 router.get('/:subscription_id', getActiveSubscriptionById);
// router.delete('/:address_id', deleteAlternateAddress);
// router.put('/:address_id', updateUserAddressDetails);




module.exports = router;