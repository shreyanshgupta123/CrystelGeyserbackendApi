const express = require('express');
const router = express.Router();
const {
  addDeliveredOrders,
  getdeliveredOrders,
  deleteDeliveredOrder,
  getDeliveredOrderById
} = require('../services/deliveredOrdersService');

/**
 * @swagger
 * /api/deliveredorders:
 *   post:
 *     tags:
 *       - Delivered Orders
 *     summary: Add a new delivered order
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
 *     responses:
 *       201:
 *         description: The created delivered order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addDeliveredOrders);

/**
 * @swagger
 * /api/deliveredorders:
 *   get:
 *     tags:
 *       - Delivered Orders
 *     summary: Retrieve a list of delivered orders
 *     responses:
 *       200:
 *         description: A list of delivered orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getdeliveredOrders);

/**
 * @swagger
 * /api/deliveredorders/{order_id}:
 *   get:
 *     tags:
 *       - Delivered Orders
 *     summary: Retrieve a single delivered order by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: A single delivered order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:order_id', getDeliveredOrderById);

/**
 * @swagger
 * /api/deliveredorders/{order_id}:
 *   delete:
 *     tags:
 *       - Delivered Orders
 *     summary: Delete a delivered order by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The deleted delivered order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:order_id', deleteDeliveredOrder);

module.exports = router;
