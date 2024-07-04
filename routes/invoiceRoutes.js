const express = require('express');
const router = express.Router();
const {
  addInvoice,
  getInvoice,
  getInvoiceById
} = require('../services/invoiceServices');

/**
 * @swagger
 * /api/invoice:
 *   post:
 *     tags:
 *       - Invoice
 *     summary: Add a new invoice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total_amount:
 *                 type: number
 *                 example: 100.50
 *               is_subscribed:
 *                 type: boolean
 *                 example: true
 *               is_payment_done:
 *                 type: boolean
 *                 example: true
 *               subscription_id:
 *                 type: string
 *                 example: "12345"
 *               alternate_address_id:
 *                 type: string
 *                 example: "67890"
 *     responses:
 *       200:
 *         description: The created invoice
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addInvoice);

/**
 * @swagger
 * /api/invoice:
 *   get:
 *     tags:
 *       - Invoice
 *     summary: Retrieve all invoices
 *     responses:
 *       200:
 *         description: A list of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getInvoice);

/**
 * @swagger
 * /api/invoice/{invoice_id}:
 *   get:
 *     tags:
 *       - Invoice
 *     summary: Retrieve an invoice by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The invoice ID
 *     responses:
 *       200:
 *         description: A single invoice
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:invoice_id', getInvoiceById);

module.exports = router;
