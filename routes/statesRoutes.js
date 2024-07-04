const express = require('express');
const router = express.Router();
const { addState, getState, getStatesById, deleteStates } = require('../services/statesServices');

/**
 * @swagger
 * /api/states:
 *   post:
 *     tags:
 *       - States
 *     summary: Add a new state
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               states:
 *                 type: string
 *                 example: "California"
 *     responses:
 *       200:
 *         description: The added state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addState);

/**
 * @swagger
 * /api/states:
 *   get:
 *     tags:
 *       - States
 *     summary: Retrieve all states
 *     responses:
 *       200:
 *         description: A list of states
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getState);

/**
 * @swagger
 * /api/states/{invoice_id}:
 *   get:
 *     tags:
 *       - States
 *     summary: Get a state by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the state to retrieve
 *     responses:
 *       200:
 *         description: The requested state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:invoice_id', getStatesById);

/**
 * @swagger
 * /api/states/{invoice_id}:
 *   delete:
 *     tags:
 *       - States
 *     summary: Delete a state by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the state to delete
 *     responses:
 *       200:
 *         description: The deleted state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:invoice_id', deleteStates);

module.exports = router;
