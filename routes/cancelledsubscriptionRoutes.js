const express = require('express');
const router = express.Router();
   
    const {createCancelledSubscription,getCancelledSubscription} = require('../services/cancelledsubscriptionService');


router.post('/', createCancelledSubscription);
  router.get('/',  getCancelledSubscription);
// router.get('/:address_id', getAlternateAddressById);
// router.delete('/:address_id', deleteAlternateAddress);
// router.put('/:address_id', updateUserAddressDetails);




module.exports = router;