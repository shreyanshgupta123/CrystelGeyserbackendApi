const express = require('express');
const router = express.Router();
const {
  addOrders,
  getOrders,
  deleteOrders
} = require('../services/ordersServices');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Add an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancelled_order_id:
 *                 type: string
 *                 example: "12345"
 *               user_id:
 *                 type: string
 *                 example: "67890"
 *               delivered_order_id:
 *                 type: string
 *                 example: "abcde"
 *               current_order_id:
 *                 type: string
 *                 example: "fghij"
 *     responses:
 *       200:
 *         description: The created order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addOrders);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Retrieve all orders
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getOrders);

/**
 * @swagger
 * /api/orders/{order_id}:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Delete an order by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The deleted order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:order_id', deleteOrders);

module.exports = router;
