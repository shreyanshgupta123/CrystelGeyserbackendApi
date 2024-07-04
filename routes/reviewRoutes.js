const express = require('express');
const router = express.Router();
const {
  addReviews,
  getReviews,
  getReviewById,
  updateReviews,
  deleteReview
} = require('../services/reviewServices');

/**
 * @swagger
 * /api/review:
 *   post:
 *     tags:
 *       - Review
 *     summary: Add a review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: string
 *                 example: "John Doe"
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               comments:
 *                 type: string
 *                 example: "Great product!"
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *               product_id:
 *                 type: string
 *                 example: "54321"
 *               title:
 *                 type: string
 *                 example: "Excellent product"
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: The created review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addReviews);

/**
 * @swagger
 * /api/review:
 *   get:
 *     tags:
 *       - Review
 *     summary: Retrieve all reviews
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getReviews);

/**
 * @swagger
 * /api/review/{invoice_id}:
 *   get:
 *     tags:
 *       - Review
 *     summary: Retrieve a review by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review
 *     responses:
 *       200:
 *         description: A single review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:invoice_id', getReviewById);

/**
 * @swagger
 * /api/review/{invoice_id}:
 *   put:
 *     tags:
 *       - Review
 *     summary: Update a review by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: string
 *                 example: "Jane Doe"
 *               rating:
 *                 type: number
 *                 example: 5
 *               comments:
 *                 type: string
 *                 example: "Fantastic product!"
 *               user_id:
 *                 type: string
 *                 example: "54321"
 *               product_id:
 *                 type: string
 *                 example: "12345"
 *               title:
 *                 type: string
 *                 example: "Amazing product"
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/image2.jpg"
 *     responses:
 *       200:
 *         description: The updated review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/:invoice_id', updateReviews);

/**
 * @swagger
 * /api/review/{invoice_id}:
 *   delete:
 *     tags:
 *       - Review
 *     summary: Delete a review by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review
 *     responses:
 *       200:
 *         description: The deleted review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:invoice_id', deleteReview);

module.exports = router;
