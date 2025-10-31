const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);                 // CREATE
router.get('/', orderController.getAllOrders);                 // READ ALL
router.get('/:id', orderController.getOrderById);              // READ ONE
router.get('/user/:userId', orderController.getOrdersByUser);  // ORDERS BY USER
router.patch('/:id/status', orderController.updateOrderStatus); // UPDATE STATUS

module.exports = router;