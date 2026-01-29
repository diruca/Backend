const cartService = require('../services/cartService');

const getCart = async (req, res) => {
    try {
        const userId = (req.query && req.query.userId) || (req.body && req.body.userId);
        if (!userId) {
            return res.status(400).json({ status: 'error', message: 'Falta el ID de usuario' });
        }
        const cart = await cartService.getCartByUserId(userId);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const addItem = async (req, res) => {
    try {
        // Debug logging
        console.log('===== DEBUG addItem =====');
        console.log('req.body:', req.body);
        console.log('req.query:', req.query);
        console.log('req.params:', req.params);

        if (!req.body) {
            return res.status(400).json({ status: 'error', message: 'Cuerpo de petición vacío' });
        }
        const { userId, productId, quantity } = req.body;

        console.log('Extracted userId:', userId);
        console.log('Extracted productId:', productId);
        console.log('Extracted quantity:', quantity);

        if (!userId || !productId) {
            return res.status(400).json({ status: 'error', message: 'Faltan datos obligatorios' });
        }
        const cart = await cartService.addItemToCart(userId, productId, quantity || 1);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        console.error('Error en addItem:', error);
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const removeItem = async (req, res) => {
    try {
        const userId = (req.query && req.query.userId) || (req.body && req.body.userId);
        const { productId } = req.params;
        if (!userId) {
            return res.status(400).json({ status: 'error', message: 'Falta el ID de usuario' });
        }
        const cart = await cartService.removeItemFromCart(userId, productId);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = (req.query && req.query.userId) || (req.body && req.body.userId);
        if (!userId) {
            return res.status(400).json({ status: 'error', message: 'Falta el ID de usuario' });
        }
        const cart = await cartService.clearCart(userId);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getCart,
    addItem,
    removeItem,
    clearCart
};
