const express = require('express');
const router = express.Router();
const {
  forgetpassword,
  resetPassword
} = require('../services/forgetPasswordServices');

/**
 * @swagger
 * /api/forgetpassword:
 *   post:
 *     tags:
 *       - Forget Password
 *     summary: Send forget password email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Forget password email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

router.post('/', forgetpassword);

/**
 * @swagger
 * /api/forgetpassword/resetpassword:
 *   post:
 *     tags:
 *       - Forget Password
 *     summary: Reset password with reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               newPassword:
 *                 type: string
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

router.post('/resetpassword', resetPassword);

module.exports = router;
