const express = require('express');
const router = express.Router();
   
    const {createSubscription,getAllSubscription} = require('../services/AllsubscriptionsServices');


router.post('/', createSubscription);
 router.get('/',  getAllSubscription);
// router.get('/:address_id', getAlternateAddressById);
// router.delete('/:address_id', deleteAlternateAddress);
// router.put('/:address_id', updateUserAddressDetails);




module.exports = router;