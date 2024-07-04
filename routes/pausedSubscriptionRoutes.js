const express = require('express');
const router = express.Router();
const userController = require('../services/pausedsubscriptionServices');


router.post('/', userController.createPausedSubscription);
 router.delete('/:subscription_id', userController.deletePausedSubscription);
router.get('/', userController.getPausedSubscription);
 router.get('/:subscription_id', userController.getPausedSubscriptionById);


module.exports = router;