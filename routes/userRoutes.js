const express = require('express');
const router = express.Router();
const userController = require('../services/userService');

router.get('/', userController.getUserDetails);
// Additional routes like getUserById, createUser, etc.

module.exports = router;
