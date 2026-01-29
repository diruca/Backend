const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// CRUD completo para productos
router.post('/', productController.createProduct);           // CREATE
router.get('/', productController.getAllProducts);           // READ ALL
router.get('/:id', productController.getProductById);        // READ ONE
router.put('/:id', productController.updateProduct);         // UPDATE
router.delete('/:id', productController.deleteProduct);      // DELETE

module.exports = router;