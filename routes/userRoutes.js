const express = require('express');
const router = express.Router();
const userController = require('../services/userService');

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve all user details
 *     responses:
 *       200:
 *         description: A list of user details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', userController.getUserDetails);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               middle_name:
 *                 type: string
 *                 example: 
 *               age:
 *                 type: integer
 *                 example: 30
 *               gender:
 *                 type: string
 *                 example: Male
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               phone2:
 *                 type: string
 *                 example: "+9876543210"
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               image:
 *                 type: string
 *                 example: https://example.com/profile.jpg
 *               isLoggedIn:
 *                 type: boolean
 *                 example: true
 *               country:
 *                 type: string
 *                 example: United States
 *               states:
 *                 type: string
 *                 example: California
 *               city:
 *                 type: string
 *                 example: San Francisco
 *               street:
 *                 type: string
 *                 example: Market St
 *               landmark:
 *                 type: string
 *                 example: Union Square
 *               housenumber:
 *                 type: string
 *                 example: 123
 *               pinCode:
 *                 type: string
 *                 example: "94103"
 *     responses:
 *       200:
 *         description: The created user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', userController.createUserDetails);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user details by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Jane
 *               last_name:
 *                 type: string
 *                 example: Smith
 *               middle_name:
 *                 type: string
 *                 example: Ann
 *               age:
 *                 type: integer
 *                 example: 35
 *               gender:
 *                 type: string
 *                 example: Female
 *               email:
 *                 type: string
 *                 example: janesmith@example.com
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               phone2:
 *                 type: string
 *                 example: "+9876543210"
 *               username:
 *                 type: string
 *                 example: janesmith
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: "1989-05-15"
 *               image:
 *                 type: string
 *                 example: https://example.com/new_profile.jpg
 *               isLoggedIn:
 *                 type: boolean
 *                 example: true
 *               country:
 *                 type: string
 *                 example: United States
 *               states:
 *                 type: string
 *                 example: New York
 *               city:
 *                 type: string
 *                 example: New York City
 *               street:
 *                 type: string
 *                 example: Broadway
 *               landmark:
 *                 type: string
 *                 example: Times Square
 *               housenumber:
 *                 type: string
 *                 example: 456
 *               pinCode:
 *                 type: string
 *                 example: "10001"
 *     responses:
 *       200:
 *         description: The updated user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/:userId', userController.updateUserDetails);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: The deleted user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:userId', userController.deleteUserDetails);

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve user details by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A single user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:userId', userController.getUserDetailsById);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login with username
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User details if login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/login', userController.getUserDetailsByName);

module.exports = router;
