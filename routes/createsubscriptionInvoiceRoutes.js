const express = require('express');
const router = express.Router();
const { getSubscriptionInvoicePdf } = require('../services/createsubscriptionInvoice');

/**
 * @swagger
 * /api/createsubscriptioninvoice:
 *   post:
 *     tags:
 *       - Subscription Invoice PDF
 *     summary: Generate and retrieve a subscription invoice PDF
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shipping:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   address:
 *                     type: string
 *                     example: "1234 Main Street"
 *                   city:
 *                     type: string
 *                     example: "San Francisco"
 *                   state:
 *                     type: string
 *                     example: "CA"
 *                   country:
 *                     type: string
 *                     example: "US"
 *                   postal_code:
 *                     type: string
 *                     example: "94111"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "TC 100"
 *                     fromDate:
 *                       type: string
 *                       example: "06-22-2024"
 *                     toDate:
 *                       type: string
 *                       example: "06-28-2024"
 *                     amount:
 *                       type: number
 *                       example: 6000
 *     responses:
 *       200:
 *         description: Subscription invoice PDF generated successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
router.post('/', (req, res) => {
  getSubscriptionInvoicePdf(req, res);
});

module.exports = router;
