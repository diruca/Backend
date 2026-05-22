const cartService = require('../services/cartService');

const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await cartService.getCartByUserId(userId);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const addItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({ status: 'error', message: 'Faltan datos obligatorios' });
        }
        const cart = await cartService.addItemToCart(userId, productId, quantity || 1);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const removeItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        const cart = await cartService.removeItemFromCart(userId, productId);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
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
