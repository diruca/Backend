const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, orderController.createOrder);                 // CREATE
router.get('/', authMiddleware, orderController.getAllOrders);                 // READ ALL
router.get('/:id', authMiddleware, orderController.getOrderById);              // READ ONE
router.get('/my-orders', authMiddleware, orderController.getOrdersByUser);     // ORDERS BY LOGGED USER
router.patch('/:id/status', authMiddleware, orderController.updateOrderStatus); // UPDATE STATUS

module.exports = router;