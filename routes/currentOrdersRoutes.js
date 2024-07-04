const express = require('express');
const router = express.Router();
const {
  addCurrentOrders,
  getCurrentOrders,
  deleteCurrentOrder,
  getCurrentOrderById
} = require('../services/currentOrdersServices');

/**
 * @swagger
 * /api/currentorders:
 *   post:
 *     tags:
 *       - Current Orders
 *     summary: Add a new current order
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
 *         description: The created current order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addCurrentOrders);

/**
 * @swagger
 * /api/currentorders:
 *   get:
 *     tags:
 *       - Current Orders
 *     summary: Retrieve a list of current orders
 *     responses:
 *       200:
 *         description: A list of current orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getCurrentOrders);

/**
 * @swagger
 * /api/currentorders/{order_id}:
 *   get:
 *     tags:
 *       - Current Orders
 *     summary: Retrieve a single current order by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: A single current order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:order_id', getCurrentOrderById);

/**
 * @swagger
 * /api/currentorders/{order_id}:
 *   delete:
 *     tags:
 *       - Current Orders
 *     summary: Delete a current order by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The deleted current order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:order_id', deleteCurrentOrder);

module.exports = router;
