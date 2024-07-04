const express = require('express');
const router = express.Router();
const { createWishlist, getWishlist, deleteWishlist } = require('../services/wishlistServices');

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     tags:
 *       - Wishlist
 *     summary: Create a new wishlist item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productid:
 *                 type: string
 *                 example: "product123"
 *               userid:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: The created wishlist item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', createWishlist);

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     tags:
 *       - Wishlist
 *     summary: Retrieve all wishlist items
 *     responses:
 *       200:
 *         description: A list of wishlist items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getWishlist);

/**
 * @swagger
 * /api/wishlist/{order_id}:
 *   delete:
 *     tags:
 *       - Wishlist
 *     summary: Delete a wishlist item by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the wishlist item to delete
 *     responses:
 *       200:
 *         description: The deleted wishlist item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:order_id', deleteWishlist);

module.exports = router;
