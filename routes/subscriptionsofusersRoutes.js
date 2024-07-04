const express = require('express');
const router = express.Router();
const {
  addSubscriptionsOfUsers,
  getSubscriptionsOfUsers,
  getSubscriptionsOfUsersById,
  updateSubscriptionsOfUsers,
  deleteSubscriptionsOfUsers
} = require('../services/subscriptionsofusersServices');

/**
 * @swagger
 * /api/subscriptionsofusers:
 *   post:
 *     tags:
 *       - SubscriptionsOfUsers
 *     summary: Add a subscription to a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "user123"
 *               subscription_id:
 *                 type: string
 *                 example: "sub456"
 *     responses:
 *       200:
 *         description: The added subscription for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addSubscriptionsOfUsers);

/**
 * @swagger
 * /api/subscriptionsofusers:
 *   get:
 *     tags:
 *       - SubscriptionsOfUsers
 *     summary: Retrieve all subscriptions of users
 *     responses:
 *       200:
 *         description: A list of subscriptions of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getSubscriptionsOfUsers);

/**
 * @swagger
 * /api/subscriptionsofusers/{invoice_id}:
 *   get:
 *     tags:
 *       - SubscriptionsOfUsers
 *     summary: Get a subscription of a user by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the subscription to retrieve
 *     responses:
 *       200:
 *         description: The requested subscription of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:invoice_id', getSubscriptionsOfUsersById);

/**
 * @swagger
 * /api/subscriptionsofusers/{invoice_id}:
 *   put:
 *     tags:
 *       - SubscriptionsOfUsers
 *     summary: Update a subscription of a user by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the subscription to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "user123"
 *               subscription_id:
 *                 type: string
 *                 example: "sub789"
 *     responses:
 *       200:
 *         description: The updated subscription of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/:invoice_id', updateSubscriptionsOfUsers);

/**
 * @swagger
 * /api/subscriptionsofusers/{invoice_id}:
 *   delete:
 *     tags:
 *       - SubscriptionsOfUsers
 *     summary: Delete a subscription of a user by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the subscription to delete
 *     responses:
 *       200:
 *         description: The deleted subscription of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:invoice_id', deleteSubscriptionsOfUsers);

module.exports = router;
