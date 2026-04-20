const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/checkout/create-session:
 *   post:
 *     summary: Crea una sessió de Stripe per pagar una comanda
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 */
router.post('/create-session', authMiddleware, express.json(), checkoutController.createCheckoutSession);

/**
 * @swagger
 * /api/checkout/webhook:
 *   post:
 *     summary: Webhook per rebre notificacions de Stripe
 *     tags: [Checkout]
 */
// El webhook NO ha d'usar authMiddleware ja que ve de Stripe
// Tampoc ha d'usar express.json() en el body, s'ha de configurar a index.js
router.post('/webhook', express.raw({ type: 'application/json' }), checkoutController.handleWebhook);

module.exports = router;
