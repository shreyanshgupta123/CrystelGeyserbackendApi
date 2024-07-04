const express = require('express');
const router = express.Router();
const { addCountry, getCountries, getCountriesById, deleteCountries } = require('../services/countriesServices');

/**
 * @swagger
 * /api/countries:
 *   post:
 *     tags:
 *       - Countries
 *     summary: Add a new country
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *                 example: "United States"
 *     responses:
 *       200:
 *         description: The added country
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addCountry);

/**
 * @swagger
 * /api/countries:
 *   get:
 *     tags:
 *       - Countries
 *     summary: Retrieve all countries
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getCountries);

/**
 * @swagger
 * /api/countries/{invoice_id}:
 *   get:
 *     tags:
 *       - Countries
 *     summary: Get a country by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the country to retrieve
 *     responses:
 *       200:
 *         description: The requested country
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:invoice_id', getCountriesById);

/**
 * @swagger
 * /api/countries/{invoice_id}:
 *   delete:
 *     tags:
 *       - Countries
 *     summary: Delete a country by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the country to delete
 *     responses:
 *       200:
 *         description: The deleted country
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:invoice_id', deleteCountries);

module.exports = router;
