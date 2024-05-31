const express = require('express');
const router = express.Router();
const userController = require('../services/pausedsubscriptionServices');


router.post('/', userController.createPausedSubscription);
// router.put('/:userId', userController.updateUserDetails);
// router.delete('/:subscription_id', userController.deleteSubscription);
// router.get('/', userController.getSubscription);
// router.get('/:subscription_id', userController.getSubscriptionById);
// router.post('/login', userController.getUserDetailsByName);


module.exports = router;