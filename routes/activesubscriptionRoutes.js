const express = require('express');
const router = express.Router();
   
    const {createActiveSubscription,getActiveSubscription,getActiveSubscriptionById,deleteActiveSubscription} = require('../services/activesubscriptionServices');


router.post('/', createActiveSubscription);
router.get('/',  getActiveSubscription);
router.get('/:subscription_id', getActiveSubscriptionById);
router.delete('/:order_id', deleteActiveSubscription);
// router.put('/:address_id', updateUserAddressDetails);




module.exports = router;