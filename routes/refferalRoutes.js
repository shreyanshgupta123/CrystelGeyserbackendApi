const express = require('express');
const router = express.Router();
const { addRefferal, getRefferal, getRefferalById, deleteRefferal } = require('../services/refferalServices');

/**
 * @swagger
 * /api/refferal:
 *   post:
 *     tags:
 *       - Referral
 *     summary: Add a referral
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phonenumber:
 *                 type: string
 *                 example: "+1234567890"
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: The created referral
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addRefferal);

/**
 * @swagger
 * /api/refferal:
 *   get:
 *     tags:
 *       - Referral
 *     summary: Retrieve all referrals
 *     responses:
 *       200:
 *         description: A list of referrals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getRefferal);

/**
 * @swagger
 * /api/refferal/{invoice_id}:
 *   get:
 *     tags:
 *       - Referral
 *     summary: Retrieve a referral by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the referral
 *     responses:
 *       200:
 *         description: A single referral
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:invoice_id', getRefferalById);

/**
 * @swagger
 * /api/refferal/{invoice_id}:
 *   delete:
 *     tags:
 *       - Referral
 *     summary: Delete a referral by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the referral
 *     responses:
 *       200:
 *         description: The deleted referral
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:invoice_id', deleteRefferal);

module.exports = router;
