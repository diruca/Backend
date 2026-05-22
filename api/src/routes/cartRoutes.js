const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Obté el contingut del carret de l'usuari
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contingut del carret
 *       401:
 *         description: No autoritzat
 */
router.get('/', authMiddleware, cartController.getCart);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Afegeix un producte al carret
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producte afegit
 */
router.post('/add', authMiddleware, cartController.addItem);

/**
 * @swagger
 * /api/cart/remove/{productId}:
 *   delete:
 *     summary: Elimina un producte del carret
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producte eliminat
 */
router.delete('/remove/:productId', authMiddleware, cartController.removeItem);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Buida el carret
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carret buidat
 */
router.delete('/clear', authMiddleware, cartController.clearCart);

module.exports = router;
