const express = require('express');
const router = express.Router();
const userController = require('../services/pausedsubscriptionServices');

/**
 * @swagger
 * /api/pausedsubscription:
 *   post:
 *     tags:
 *       - Paused Subscription
 *     summary: Create a paused subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-07-05"
 *               expired_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-05"
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *               subscription_id:
 *                 type: string
 *                 example: "67890"
 *               is_paused:
 *                 type: boolean
 *                 example: true
 *               price:
 *                 type: number
 *                 example: 50.00
 *     responses:
 *       200:
 *         description: The created paused subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', userController.createPausedSubscription);

/**
 * @swagger
 * /api/pausedsubscription:
 *   get:
 *     tags:
 *       - Paused Subscription
 *     summary: Retrieve all paused subscriptions
 *     responses:
 *       200:
 *         description: A list of paused subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', userController.getPausedSubscription);

/**
 * @swagger
 * /api/pausedsubscription/{subscription_id}:
 *   get:
 *     tags:
 *       - Paused Subscription
 *     summary: Retrieve a paused subscription by ID
 *     parameters:
 *       - in: path
 *         name: subscription_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subscription ID
 *     responses:
 *       200:
 *         description: A single paused subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:subscription_id', userController.getPausedSubscriptionById);

/**
 * @swagger
 * /api/pausedsubscription/{subscription_id}:
 *   delete:
 *     tags:
 *       - Paused Subscription
 *     summary: Delete a paused subscription by ID
 *     parameters:
 *       - in: path
 *         name: subscription_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subscription ID
 *     responses:
 *       200:
 *         description: The deleted paused subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:subscription_id', userController.deletePausedSubscription);

module.exports = router;
