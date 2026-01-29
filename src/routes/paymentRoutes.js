const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.createPayment);                 // CREATE
router.get('/', paymentController.getAllPayments);                 // READ ALL
router.get('/:id', paymentController.getPaymentById);              // READ ONE
router.get('/order/:orderId', paymentController.getPaymentsByOrder); // PAYMENTS BY ORDER
router.patch('/:id/status', paymentController.updatePaymentStatus); // UPDATE STATUS
router.post('/:id/process', paymentController.processPayment);     // PROCESS PAYMENT

module.exports = router;