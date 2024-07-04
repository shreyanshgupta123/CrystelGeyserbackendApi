const express = require('express');
const router = express.Router();
const {
  addOrdersHistory,
  getOrdersHistory,
  deleteOrdersHistory
} = require('../services/ordersHistoryServices');

/**
 * @swagger
 * /api/ordershistory:
 *   post:
 *     tags:
 *       - Orders History
 *     summary: Add an order to history
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
 *               type_of_order:
 *                 type: string
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: The created order history entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addOrdersHistory);

/**
 * @swagger
 * /api/ordershistory:
 *   get:
 *     tags:
 *       - Orders History
 *     summary: Retrieve all orders history
 *     responses:
 *       200:
 *         description: A list of orders history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getOrdersHistory);

/**
 * @swagger
 * /api/ordershistory/{order_id}:
 *   delete:
 *     tags:
 *       - Orders History
 *     summary: Delete an order from history by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The deleted order history entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:order_id', deleteOrdersHistory);

module.exports = router;
