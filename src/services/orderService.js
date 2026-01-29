const Order = require('../models/Order');

const createOrder = async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
};

const getAllOrders = async () => {
    return await Order.find()
        .populate('user', 'name email')
        .populate('items.product', 'name price');
};

const getOrderById = async (orderId) => {
    return await Order.findById(orderId)
        .populate('user', 'name email')
        .populate('items.product', 'name price brand');
};

const getOrdersByUser = async (userId) => {
    return await Order.find({ user: userId })
        .populate('items.product', 'name price');
};

const updateOrderStatus = async (orderId, status) => {
    return await Order.findByIdAndUpdate(
        orderId, 
        { status }, 
        { new: true, runValidators: true }
    );
};

const deleteOrder = async (orderId) => {
    return await Order.findByIdAndDelete(orderId);
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUser,
    updateOrderStatus,
    deleteOrder
};