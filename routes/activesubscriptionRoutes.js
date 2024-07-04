const express = require('express');
const router = express.Router();
const {
  createActiveSubscription,
  getActiveSubscription,
  getActiveSubscriptionById,
  deleteActiveSubscription
} = require('../services/activesubscriptionServices');

/**
 * @swagger
 * /api/activesubscription:
 *   post:
 *     tags:
 *       - Active Subscription
 *     summary: Create a new active subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 example: 19.99
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *               purchased_date:
 *                 type: string
 *                 format: date
 *                 example: "2023-07-04"
 *               subscription_type:
 *                 type: string
 *                 example: "monthly"
 *     responses:
 *       201:
 *         description: The created active subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', createActiveSubscription);

/**
 * @swagger
 * /api/activesubscription:
 *   get:
 *     tags:
 *       - Active Subscription
 *     summary: Retrieve a list of active subscriptions
 *     responses:
 *       200:
 *         description: A list of active subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getActiveSubscription);

/**
 * @swagger
 * /api/activesubscription/{subscription_id}:
 *   get:
 *     tags:
 *       - Active Subscription
 *     summary: Retrieve a single active subscription by ID
 *     parameters:
 *       - in: path
 *         name: subscription_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subscription ID
 *     responses:
 *       200:
 *         description: A single active subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:subscription_id', getActiveSubscriptionById);

/**
 * @swagger
 * /api/activesubscription/{order_id}:
 *   delete:
 *     tags:
 *       - Active Subscription
 *     summary: Delete an active subscription by order ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The deleted active subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:order_id', deleteActiveSubscription);

module.exports = router;
