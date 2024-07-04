const express = require('express');
const router = express.Router();
const userController = require('../services/subscriptionServices');

/**
 * @swagger
 * /api/subscription:
 *   post:
 *     tags:
 *       - Subscription
 *     summary: Create a subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *               price:
 *                 type: number
 *                 example: 29.99
 *               subscription_type:
 *                 type: string
 *                 example: "Monthly"
 *               subscription_category:
 *                 type: string
 *                 example: "Basic"
 *               purchasedDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-07-05"
 *     responses:
 *       200:
 *         description: The created subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', userController.createSubscription);

/**
 * @swagger
 * /api/subscription/{subscription_id}:
 *   put:
 *     tags:
 *       - Subscription
 *     summary: Update a subscription by ID
 *     parameters:
 *       - in: path
 *         name: subscription_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "54321"
 *               price:
 *                 type: number
 *                 example: 39.99
 *               subscription_type:
 *                 type: string
 *                 example: "Annual"
 *               subscription_category:
 *                 type: string
 *                 example: "Premium"
 *               purchasedDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-07-01"
 *     responses:
 *       200:
 *         description: The updated subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/:subscription_id', userController.updateSubscription);

/**
 * @swagger
 * /api/subscription/{subscription_id}:
 *   delete:
 *     tags:
 *       - Subscription
 *     summary: Delete a subscription by ID
 *     parameters:
 *       - in: path
 *         name: subscription_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the subscription
 *     responses:
 *       200:
 *         description: The deleted subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:subscription_id', userController.deleteSubscription);

/**
 * @swagger
 * /api/subscription:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Retrieve all subscriptions
 *     responses:
 *       200:
 *         description: A list of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', userController.getSubscription);

/**
 * @swagger
 * /api/subscription/{subscription_id}:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Retrieve a subscription by ID
 *     parameters:
 *       - in: path
 *         name: subscription_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the subscription
 *     responses:
 *       200:
 *         description: A single subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:subscription_id', userController.getSubscriptionById);

module.exports = router;
