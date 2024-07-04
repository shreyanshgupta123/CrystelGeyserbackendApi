const express = require('express');
const router = express.Router();
const {
  addCancelledOrders,
  getCancelledOrders,
  deleteCancelledOrders,
  getCancelledOrderById
} = require('../services/cancelledOrdersServices');

/**
 * @swagger
 * /api/cancelledorders:
 *   post:
 *     tags:
 *       - Cancelled Orders
 *     summary: Add a new cancelled order
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
 *               product_id:
 *                 type: string
 *                 example: "67890"
 *               price:
 *                 type: number
 *                 example: 19.99
 *               unit:
 *                 type: string
 *                 example: "1"
 *               payment_method:
 *                 type: string
 *                 example: "Credit Card"
 *               cancellation_reason:
 *                 type: string
 *                 example: "Changed my mind"
 *     responses:
 *       201:
 *         description: The created cancelled order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addCancelledOrders);

/**
 * @swagger
 * /api/cancelledorders:
 *   get:
 *     tags:
 *       - Cancelled Orders
 *     summary: Retrieve a list of cancelled orders
 *     responses:
 *       200:
 *         description: A list of cancelled orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getCancelledOrders);

/**
 * @swagger
 * /api/cancelledorders/{order_id}:
 *   get:
 *     tags:
 *       - Cancelled Orders
 *     summary: Retrieve a single cancelled order by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: A single cancelled order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:order_id', getCancelledOrderById);

/**
 * @swagger
 * /api/cancelledorders/{order_id}:
 *   delete:
 *     tags:
 *       - Cancelled Orders
 *     summary: Delete a cancelled order by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The deleted cancelled order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:order_id', deleteCancelledOrders);

module.exports = router;
