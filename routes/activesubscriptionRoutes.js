const express = require('express');
const router = express.Router();
   
    const {createActiveSubscription,getActiveSubscription} = require('../services/activesubscriptionServices');


router.post('/', createActiveSubscription);
 router.get('/',  getActiveSubscription);
// router.get('/:address_id', getAlternateAddressById);
// router.delete('/:address_id', deleteAlternateAddress);
// router.put('/:address_id', updateUserAddressDetails);




module.exports = router;