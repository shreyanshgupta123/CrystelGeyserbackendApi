const express = require('express');
const router = express.Router();
const userController = require('../services/subscriptionServices');


router.post('/', userController.createSubscription);
 router.put('/:subscription_id', userController.updateSubscription);
router.delete('/:subscription_id', userController.deleteSubscription);
router.get('/', userController.getSubscription);
router.get('/:subscription_id', userController.getSubscriptionById);
// router.post('/login', userController.getUserDetailsByName);


module.exports = router;