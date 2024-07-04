const express = require('express');
const router = express.Router();
const userController = require('../services/discountServices');

/**
 * @swagger
 * /api/discount:
 *   post:
 *     tags:
 *       - Discount
 *     summary: Create a new discount
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               months:
 *                 type: number
 *                 example: 6
 *               discount:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: The created discount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', userController.createDiscount);

/**
 * @swagger
 * /api/discount/{order_id}:
 *   put:
 *     tags:
 *       - Discount
 *     summary: Update a discount by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               months:
 *                 type: number
 *                 example: 6
 *               discount:
 *                 type: number
 *                 example: 15
 *     responses:
 *       200:
 *         description: The updated discount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/:order_id', userController.updateDiscount);

/**
 * @swagger
 * /api/discount/{discount_id}:
 *   delete:
 *     tags:
 *       - Discount
 *     summary: Delete a discount by ID
 *     parameters:
 *       - in: path
 *         name: discount_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount ID
 *     responses:
 *       200:
 *         description: The deleted discount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:discount_id', userController.deletediscount);

/**
 * @swagger
 * /api/discount/{discount_id}:
 *   get:
 *     tags:
 *       - Discount
 *     summary: Retrieve a discount by ID
 *     parameters:
 *       - in: path
 *         name: discount_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discount ID
 *     responses:
 *       200:
 *         description: A single discount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:discount_id', userController.getDiscountById);

/**
 * @swagger
 * /api/discount:
 *   get:
 *     tags:
 *       - Discount
 *     summary: Retrieve all discounts
 *     responses:
 *       200:
 *         description: A list of discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', userController.getDiscounts);

module.exports = router;
