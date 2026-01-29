const Cart = require('../models/cart');

const getCartByUserId = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }
    return cart;
};

const addItemToCart = async (userId, productId, quantity) => {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    return await cart.save();
};

const removeItemFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        return await cart.save();
    }
    return null;
};

const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
        cart.items = [];
        return await cart.save();
    }
    return null;
};

module.exports = {
    getCartByUserId,
    addItemToCart,
    removeItemFromCart,
    clearCart
};
