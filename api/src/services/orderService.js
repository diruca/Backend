const Order = require('../models/order');

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

const getOrderStats = async () => {
    const stats = {};

    // Total orders and revenue
    const generalStats = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                totalRevenue: { $sum: '$total' }
            }
        }
    ]);
    stats.general = generalStats[0] || { totalOrders: 0, totalRevenue: 0 };

    // Orders by status
    const statusStats = await Order.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);
    stats.byStatus = statusStats;

    // Daily sales (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyStats = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: sevenDaysAgo }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                revenue: { $sum: '$total' },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
    stats.daily = dailyStats;

    return stats;
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUser,
    updateOrderStatus,
    deleteOrder,
    getOrderStats
};