const express = require('express');
const router = express.Router();
const { addNews, getNews, getNewsById, deleteNews } = require('../services/newsServices');

/**
 * @swagger
 * /api/news:
 *   post:
 *     tags:
 *       - News
 *     summary: Add a new news article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               publisher_name:
 *                 type: string
 *                 example: "Newspaper XYZ"
 *               published_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-07-04"
 *               title:
 *                 type: string
 *                 example: "New Discoveries in Science"
 *               description:
 *                 type: string
 *                 example: "Scientists have made groundbreaking discoveries..."
 *     responses:
 *       200:
 *         description: The added news article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addNews);

/**
 * @swagger
 * /api/news:
 *   get:
 *     tags:
 *       - News
 *     summary: Retrieve all news articles
 *     responses:
 *       200:
 *         description: A list of news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getNews);

/**
 * @swagger
 * /api/news/{invoice_id}:
 *   get:
 *     tags:
 *       - News
 *     summary: Get a news article by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the news article to retrieve
 *     responses:
 *       200:
 *         description: The requested news article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:invoice_id', getNewsById);

/**
 * @swagger
 * /api/news/{invoice_id}:
 *   delete:
 *     tags:
 *       - News
 *     summary: Delete a news article by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the news article to delete
 *     responses:
 *       200:
 *         description: The deleted news article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:invoice_id', deleteNews);

module.exports = router;
