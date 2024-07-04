const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductsById,
  deleteProductsById,
  getProductsByName,
  addProduct,
  getAllProductsInAscendingOrder,
  getAllProductsInDescendingOrder,
  getAllProductsInAscendingOrderByRating,
  getAllProductsInDescendingOrderByRating,
  getAllProductsInDescendingOrderBySize,
  getAllProductsInAscendingOrderBySize,
  getAllProductsBySearch
} = require('../services/productService');

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /api/products/{productid}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a product by ID
 *     parameters:
 *       - in: path
 *         name: productid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:productid', getProductsById);

/**
 * @swagger
 * /api/products/search/{search}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Search products by name
 *     parameters:
 *       - in: path
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: The search keyword for product name
 *     responses:
 *       200:
 *         description: A list of products matching the search
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/search/:search', getAllProductsBySearch);

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Add a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "Product Name"
 *               price:
 *                 type: number
 *                 example: 50.00
 *               size:
 *                 type: string
 *                 example: "Large"
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               bottles:
 *                 type: number
 *                 example: 6
 *               image:
 *                 type: string
 *                 example: "product.jpg"
 *               description:
 *                 type: string
 *                 example: "Product description"
 *               category_id:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', addProduct);

/**
 * @swagger
 * /api/products/priceasc:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products in ascending order by price
 *     responses:
 *       200:
 *         description: A list of products sorted by price in ascending order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/priceasc', getAllProductsInAscendingOrder);

/**
 * @swagger
 * /api/products/pricedesc:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products in descending order by price
 *     responses:
 *       200:
 *         description: A list of products sorted by price in descending order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/pricedesc', getAllProductsInDescendingOrder);

/**
 * @swagger
 * /api/products/sizeasc:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products in ascending order by size
 *     responses:
 *       200:
 *         description: A list of products sorted by size in ascending order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/sizeasc', getAllProductsInAscendingOrderBySize);

/**
 * @swagger
 * /api/products/sizedesc:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products in descending order by size
 *     responses:
 *       200:
 *         description: A list of products sorted by size in descending order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/sizedesc', getAllProductsInDescendingOrderBySize);

/**
 * @swagger
 * /api/products/ratingasc:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products in ascending order by rating
 *     responses:
 *       200:
 *         description: A list of products sorted by rating in ascending order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/ratingasc', getAllProductsInAscendingOrderByRating);

/**
 * @swagger
 * /api/products/ratingdesc:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products in descending order by rating
 *     responses:
 *       200:
 *         description: A list of products sorted by rating in descending order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/ratingdesc', getAllProductsInDescendingOrderByRating);

/**
 * @swagger
 * /api/products/product/{productname}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a product by name
 *     parameters:
 *       - in: path
 *         name: productname
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the product
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/product/:productname', getProductsByName);

/**
 * @swagger
 * /api/products/{productid}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: productid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: The deleted product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/:productid', deleteProductsById);

module.exports = router;
