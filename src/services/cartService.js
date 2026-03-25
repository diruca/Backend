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

    await cart.save();
    return await Cart.findById(cart._id).populate('items.product');
};

const removeItemFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        return await Cart.findById(cart._id).populate('items.product');
    }
    return null;
};

const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
        cart.items = [];
        await cart.save();
        return await Cart.findById(cart._id).populate('items.product');
    }
    return null;
};

module.exports = {
    getCartByUserId,
    addItemToCart,
    removeItemFromCart,
    clearCart
};
