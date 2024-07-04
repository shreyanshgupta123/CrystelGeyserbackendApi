const express = require('express');
const router = express.Router();
const {
  addFeedback,
  getFeedback,
  getFeedbackById
} = require('../services/feedbackServices');

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     tags:
 *       - Feedback
 *     summary: Add new feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_delivered_as_expected:
 *                 type: boolean
 *                 example: true
 *               is_item_as_described_as_seller:
 *                 type: boolean
 *                 example: true
 *               comments:
 *                 type: string
 *                 example: "Great service!"
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *               order_id:
 *                 type: string
 *                 example: "67890"
 *     responses:
 *       201:
 *         description: The created feedback
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addFeedback);

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     tags:
 *       - Feedback
 *     summary: Retrieve all feedback
 *     responses:
 *       200:
 *         description: A list of feedback
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getFeedback);

/**
 * @swagger
 * /api/feedback/{invoice_id}:
 *   get:
 *     tags:
 *       - Feedback
 *     summary: Retrieve feedback by invoice ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The invoice ID
 *     responses:
 *       200:
 *         description: A single feedback
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:invoice_id', getFeedbackById);

module.exports = router;
