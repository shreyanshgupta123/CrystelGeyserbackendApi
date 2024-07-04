const express = require('express');
const router = express.Router();
const {
  createSubscription,
  getAllSubscription,
  updateAllSubscription,
  getAllSubscriptionById
} = require('../services/AllsubscriptionsServices');

/**
 * @swagger
 * /api/allsubscriptions:
 *   post:
 *     tags:
 *       - All Subscriptions
 *     summary: Create a new subscription
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
 *               active_subscription_id:
 *                 type: string
 *                 example: "67890"
 *               cancelled_subscription_id:
 *                 type: string
 *                 example: "23456"
 *               paused_subscription_id:
 *                 type: string
 *                 example: "78901"
 *     responses:
 *       201:
 *         description: The created subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', createSubscription);

/**
 * @swagger
 * /api/allsubscriptions/{subscription_id}:
 *   put:
 *     tags:
 *       - All Subscriptions
 *     summary: Update a subscription by ID
 *     parameters:
 *       - in: path
 *         name: subscription_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subscription ID
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
 *               active_subscription_id:
 *                 type: string
 *                 example: "67890"
 *               cancelled_subscription_id:
 *                 type: string
 *                 example: "23456"
 *               paused_subscription_id:
 *                 type: string
 *                 example: "78901"
 *     responses:
 *       200:
 *         description: The updated subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/:subscription_id', updateAllSubscription);

/**
 * @swagger
 * /api/allsubscriptions:
 *   get:
 *     tags:
 *       - All Subscriptions
 *     summary: Retrieve a list of all subscriptions
 *     responses:
 *       200:
 *         description: A list of all subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getAllSubscription);

/**
 * @swagger
 * /api/allsubscriptions/{subscription_id}:
 *   get:
 *     tags:
 *       - All Subscriptions
 *     summary: Retrieve a single subscription by ID
 *     parameters:
 *       - in: path
 *         name: subscription_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subscription ID
 *     responses:
 *       200:
 *         description: A single subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:subscription_id', getAllSubscriptionById);

module.exports = router;
