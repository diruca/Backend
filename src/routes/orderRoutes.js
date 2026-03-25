const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crea una nova comanda
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Comanda creada
 */
router.post('/', authMiddleware, orderController.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obté totes les comandes
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de comandes
 */
router.get('/', authMiddleware, orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Obté les comandes de l'usuari autenticat
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de comandes de l'usuari
 */
router.get('/my-orders', authMiddleware, orderController.getOrdersByUser);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obté una comanda per ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dades de la comanda
 */
router.get('/:id', authMiddleware, orderController.getOrderById);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Actualitza l'estat d'una comanda
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *     responses:
 *       200:
 *         description: Estat actualitzat
 */
router.patch('/:id/status', authMiddleware, orderController.updateOrderStatus);

module.exports = router;