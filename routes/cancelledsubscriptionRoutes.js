const express = require('express');
const router = express.Router();
   
    const {createCancelledSubscription,getCancelledSubscription,getCancelledSubscriptionById} = require('../services/cancelledsubscriptionService');


router.post('/', createCancelledSubscription);
  router.get('/',  getCancelledSubscription);
router.get('/:subscription_id', getCancelledSubscriptionById);
// router.delete('/:address_id', deleteAlternateAddress);
// router.put('/:address_id', updateUserAddressDetails);




module.exports = router;