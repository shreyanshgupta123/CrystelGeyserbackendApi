const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
// Additional routes like getUserById, createUser, etc.

module.exports = router;
