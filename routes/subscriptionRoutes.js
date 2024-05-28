const express = require('express');
const router = express.Router();
const userController = require('../services/subscriptionServices');


router.post('/', userController.createSubscription);
// router.put('/:userId', userController.updateUserDetails);
router.delete('/:subscription_id', userController.deleteSubscription);
router.get('/', userController.getSubscription);
// router.post('/login', userController.getUserDetailsByName);


module.exports = router;