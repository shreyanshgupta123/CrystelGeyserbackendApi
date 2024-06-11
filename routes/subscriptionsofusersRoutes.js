const express = require('express');
const router = express.Router();
const {addSubscriptionsOfUsers,getSubscriptionsOfUsers,getSubscriptionsOfUsersById,updateSubscriptionsOfUsers,deleteSubscriptionsOfUsers} = require('../services/subscriptionsofusersServices');


router.post('/', addSubscriptionsOfUsers);
router.get('/', getSubscriptionsOfUsers);
router.get('/:invoice_id', getSubscriptionsOfUsersById);
router.put('/:invoice_id', updateSubscriptionsOfUsers);
 router.delete('/:invoice_id', deleteSubscriptionsOfUsers);



module.exports = router;