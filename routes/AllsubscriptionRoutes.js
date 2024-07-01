const express = require('express');
const router = express.Router();
   
    const {createSubscription,getAllSubscription,updateAllSubscription,getAllSubscriptionById} = require('../services/AllsubscriptionsServices');


router.post('/', createSubscription);
router.put('/:subscription_id', updateAllSubscription);
router.get('/',  getAllSubscription);

router.get('/:subscription_id', getAllSubscriptionById);





module.exports = router;