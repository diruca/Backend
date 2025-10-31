const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD completo para usuarios
router.post('/', userController.createUser);           // CREATE
router.get('/', userController.getAllUsers);           // READ ALL
router.get('/:id', userController.getUserById);        // READ ONE
router.put('/:id', userController.updateUser);         // UPDATE
router.delete('/:id', userController.deleteUser);      // DELETE

module.exports = router;