const express = require('express');
const router = express.Router();
const {
  addReturnJarRequest,
  getReturnJarRequest,
  getReturnJarRequestById,
  updateReturnJarRequests,
  deleteReturnJarRequests
} = require('../services/returnjarrequestServices');

/**
 * @swagger
 * /api/returnrequest:
 *   post:
 *     tags:
 *       - Return Jar Request
 *     summary: Add a return jar request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number_of_cans:
 *                 type: integer
 *                 example: 3
 *               full_name:
 *                 type: string
 *                 example: "John Doe"
 *               mobile_number:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               pincode:
 *                 type: string
 *                 example: "12345"
 *               city:
 *                 type: string
 *                 example: "New York"
 *               state:
 *                 type: string
 *                 example: "NY"
 *               building_number:
 *                 type: string
 *                 example: "Building A"
 *               road_name:
 *                 type: string
 *                 example: "Broadway"
 *               locality:
 *                 type: string
 *                 example: "Downtown"
 *               alternate_mobile_number:
 *                 type: string
 *                 example: "+1987654321"
 *               landmark:
 *                 type: string
 *                 example: "Near Central Park"
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: The created return jar request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addReturnJarRequest);

/**
 * @swagger
 * /api/returnrequest:
 *   get:
 *     tags:
 *       - Return Jar Request
 *     summary: Retrieve all return jar requests
 *     responses:
 *       200:
 *         description: A list of return jar requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getReturnJarRequest);

/**
 * @swagger
 * /api/returnrequest/{invoice_id}:
 *   get:
 *     tags:
 *       - Return Jar Request
 *     summary: Retrieve a return jar request by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the return jar request
 *     responses:
 *       200:
 *         description: A single return jar request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:invoice_id', getReturnJarRequestById);

/**
 * @swagger
 * /api/returnrequest/{invoice_id}:
 *   put:
 *     tags:
 *       - Return Jar Request
 *     summary: Update a return jar request by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the return jar request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number_of_cans:
 *                 type: integer
 *                 example: 5
 *               full_name:
 *                 type: string
 *                 example: "Jane Doe"
 *               mobile_number:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "456 Park Ave"
 *               pincode:
 *                 type: string
 *                 example: "54321"
 *               city:
 *                 type: string
 *                 example: "Los Angeles"
 *               state:
 *                 type: string
 *                 example: "CA"
 *               building_number:
 *                 type: string
 *                 example: "Building B"
 *               road_name:
 *                 type: string
 *                 example: "Main Street"
 *               locality:
 *                 type: string
 *                 example: "Uptown"
 *               alternate_mobile_number:
 *                 type: string
 *                 example: "+1987654321"
 *               landmark:
 *                 type: string
 *                 example: "Near Hollywood Sign"
 *               user_id:
 *                 type: string
 *                 example: "54321"
 *     responses:
 *       200:
 *         description: The updated return jar request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/:invoice_id', updateReturnJarRequests);

/**
 * @swagger
 * /api/returnrequest/{invoice_id}:
 *   delete:
 *     tags:
 *       - Return Jar Request
 *     summary: Delete a return jar request by ID
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the return jar request
 *     responses:
 *       200:
 *         description: The deleted return jar request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:invoice_id', deleteReturnJarRequests);

module.exports = router;
