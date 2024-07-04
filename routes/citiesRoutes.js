const express = require('express');
const router = express.Router();
const { addCity, getCitiesById, deleteCities } = require('../services/citiesServices');

/**
 * @swagger
 * /api/cities:
 *   post:
 *     tags:
 *       - Cities
 *     summary: Add a new city
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *                 example: "New York"
 *     responses:
 *       200:
 *         description: The added city
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addCity);

/**
 * @swagger
 * /api/cities:
 *   get:
 *     tags:
 *       - Cities
 *     summary: Retrieve all cities
 *     responses:
 *       200:
 *         description: A list of cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getCitiesById);

/**
 * @swagger
 * /api/cities/{invoice_id}:
 *   get:
 *     tags:
 *       - Cities
 *     summary: Get a city by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the city to retrieve
 *     responses:
 *       200:
 *         description: The requested city
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:invoice_id', getCitiesById);

/**
 * @swagger
 * /api/cities/{invoice_id}:
 *   delete:
 *     tags:
 *       - Cities
 *     summary: Delete a city by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the city to delete
 *     responses:
 *       200:
 *         description: The deleted city
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:invoice_id', deleteCities);

module.exports = router;
