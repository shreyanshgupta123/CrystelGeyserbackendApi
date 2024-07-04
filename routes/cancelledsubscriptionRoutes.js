const express = require('express');
const router = express.Router();
const {
  createCancelledSubscription,
  getCancelledSubscription,
  getCancelledSubscriptionById
} = require('../services/cancelledsubscriptionService');

/**
 * @swagger
 * /api/cancelledsubscription:
 *   post:
 *     tags:
 *       - Cancelled Subscription
 *     summary: Create a new cancelled subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 example: 29.99
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *               purchased_date:
 *                 type: string
 *                 format: date
 *                 example: "2023-06-25"
 *               reason:
 *                 type: string
 *                 example: "No longer needed"
 *     responses:
 *       201:
 *         description: The created cancelled subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', createCancelledSubscription);

/**
 * @swagger
 * /api/cancelledsubscription:
 *   get:
 *     tags:
 *       - Cancelled Subscription
 *     summary: Retrieve a list of cancelled subscriptions
 *     responses:
 *       200:
 *         description: A list of cancelled subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getCancelledSubscription);

/**
 * @swagger
 * /api/cancelledsubscription/{subscription_id}:
 *   get:
 *     tags:
 *       - Cancelled Subscription
 *     summary: Retrieve a single cancelled subscription by ID
 *     parameters:
 *       - in: path
 *         name: subscription_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subscription ID
 *     responses:
 *       200:
 *         description: A single cancelled subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:subscription_id', getCancelledSubscriptionById);

module.exports = router;
