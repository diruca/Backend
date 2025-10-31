const orderService = require('../services/orderService');

const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json({ status: 'success', data: order });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json({ status: 'success', data: orders });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ status: 'error', message: 'Pedido no encontrado' });
        }
        res.status(200).json({ status: 'success', data: order });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getOrdersByUser = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByUser(req.params.userId);
        res.status(200).json({ status: 'success', data: orders });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
        if (!order) {
            return res.status(404).json({ status: 'error', message: 'Pedido no encontrado' });
        }
        res.status(200).json({ status: 'success', data: order });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUser,
    updateOrderStatus
};