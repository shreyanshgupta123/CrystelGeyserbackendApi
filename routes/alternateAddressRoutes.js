const express = require('express');
const router = express.Router();
const {
  addAlternateAddress,
  getAlternateAddress,
  deleteAlternateAddress,
  updateUserAddressDetails,
  getAlternateAddressById
} = require('../services/alternateAddressServices');

/**
 * @swagger
 * /api/alternateaddress:
 *   post:
 *     tags:
 *       - Alternate Address
 *     summary: Add a new alternate address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               states:
 *                 type: string
 *                 example: "California"
 *               city:
 *                 type: string
 *                 example: "Los Angeles"
 *               street:
 *                 type: string
 *                 example: "Sunset Blvd"
 *               landmark:
 *                 type: string
 *                 example: "Near Hollywood Sign"
 *               housenumber:
 *                 type: string
 *                 example: "123"
 *               pincode:
 *                 type: string
 *                 example: "90001"
 *               phone:
 *                 type: string
 *                 example: "555-1234"
 *               phone2:
 *                 type: string
 *                 example: "555-5678"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: The created alternate address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addAlternateAddress);

/**
 * @swagger
 * /api/alternateaddress:
 *   get:
 *     tags:
 *       - Alternate Address
 *     summary: Retrieve a list of alternate addresses
 *     responses:
 *       200:
 *         description: A list of alternate addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getAlternateAddress);

/**
 * @swagger
 * /api/alternateaddress/{address_id}:
 *   get:
 *     tags:
 *       - Alternate Address
 *     summary: Retrieve a single alternate address by ID
 *     parameters:
 *       - in: path
 *         name: address_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address ID
 *     responses:
 *       200:
 *         description: A single alternate address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:address_id', getAlternateAddressById);

/**
 * @swagger
 * /api/alternateaddress/{address_id}:
 *   delete:
 *     tags:
 *       - Alternate Address
 *     summary: Delete an alternate address by ID
 *     parameters:
 *       - in: path
 *         name: address_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address ID
 *     responses:
 *       200:
 *         description: The deleted alternate address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:address_id', deleteAlternateAddress);

/**
 * @swagger
 * /api/alternateaddress/{address_id}:
 *   put:
 *     tags:
 *       - Alternate Address
 *     summary: Update an alternate address by ID
 *     parameters:
 *       - in: path
 *         name: address_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               states:
 *                 type: string
 *                 example: "California"
 *               city:
 *                 type: string
 *                 example: "Los Angeles"
 *               street:
 *                 type: string
 *                 example: "Sunset Blvd"
 *               landmark:
 *                 type: string
 *                 example: "Near Hollywood Sign"
 *               housenumber:
 *                 type: string
 *                 example: "123"
 *               pincode:
 *                 type: string
 *                 example: "90001"
 *               phone:
 *                 type: string
 *                 example: "555-1234"
 *               phone2:
 *                 type: string
 *                 example: "555-5678"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: The updated alternate address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/:address_id', updateUserAddressDetails);

module.exports = router;
