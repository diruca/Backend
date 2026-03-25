const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Crea un nou pagament
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pagament creat
 */
router.post('/', paymentController.createPayment);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Obté tots els pagaments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista de pagaments
 */
router.get('/', paymentController.getAllPayments);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Obté un pagament per ID
 *     tags: [Payments]
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
 *         description: Dades del pagament
 */
router.get('/:id', paymentController.getPaymentById);

/**
 * @swagger
 * /api/payments/order/{orderId}:
 *   get:
 *     summary: Obté els pagaments per ID de comanda
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Llista de pagaments de la comanda
 */
router.get('/order/:orderId', paymentController.getPaymentsByOrder);

/**
 * @swagger
 * /api/payments/{id}/status:
 *   patch:
 *     summary: Actualitza l'estat d'un pagament
 *     tags: [Payments]
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
 *         description: Estat actualitzat
 */
router.patch('/:id/status', paymentController.updatePaymentStatus);

/**
 * @swagger
 * /api/payments/{id}/process:
 *   post:
 *     summary: Processa un pagament
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pagament processat
 */
router.post('/:id/process', paymentController.processPayment);

module.exports = router;