const express = require('express');
const router = express.Router();
const userController = require('../services/userService');

router.get('/', userController.getUserDetails);
router.post('/', userController.createUserDetails);
router.put('/:userId', userController.updateUserDetails);
router.delete('/:userId', userController.deleteUserDetails);
router.get('/:userId', userController.getUserDetailsById);
// Additional routes like getUserById, createUser, etc.

module.exports = router;
