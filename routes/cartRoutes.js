const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, updateCartItems, deleteCartItems, getCartItemFeatures } = require('../services/cartService');

/**
 * @swagger
 * /api/cart:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add a product to the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               productid:
 *                 type: string
 *                 example: "product123"
 *               userid:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: The added item in the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Retrieve all cart items
 *     responses:
 *       200:
 *         description: A list of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getCartItems);

/**
 * @swagger
 * /api/cart/cart_features:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Retrieve cart features
 *     responses:
 *       200:
 *         description: Cart features
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/cart_features', getCartItemFeatures);

/**
 * @swagger
 * /api/cart/{order_id}:
 *   put:
 *     tags:
 *       - Cart
 *     summary: Update a cart item by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the cart item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: The updated cart item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/:order_id', updateCartItems);

/**
 * @swagger
 * /api/cart/{order_id}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Delete a cart item by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the cart item to delete
 *     responses:
 *       200:
 *         description: The deleted cart item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:order_id', deleteCartItems);

module.exports = router;
