const paymentService = require('../services/paymentService');

const createPayment = async (req, res) => {
    try {
        const payment = await paymentService.createPayment(req.body);
        res.status(201).json({ status: 'success', data: payment });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentService.getAllPayments();
        res.status(200).json({ status: 'success', data: payments });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
        if (!payment) {
            return res.status(404).json({ status: 'error', message: 'Pago no encontrado' });
        }
        res.status(200).json({ status: 'success', data: payment });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getPaymentsByOrder = async (req, res) => {
    try {
        const payments = await paymentService.getPaymentsByOrder(req.params.orderId);
        res.status(200).json({ status: 'success', data: payments });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const payment = await paymentService.updatePaymentStatus(req.params.id, req.body.status);
        if (!payment) {
            return res.status(404).json({ status: 'error', message: 'Pago no encontrado' });
        }
        res.status(200).json({ status: 'success', data: payment });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const processPayment = async (req, res) => {
    try {
        const payment = await paymentService.processPayment(req.params.id, req.body);
        if (!payment) {
            return res.status(404).json({ status: 'error', message: 'Pago no encontrado' });
        }
        res.status(200).json({ status: 'success', data: payment });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    getPaymentsByOrder,
    updatePaymentStatus,
    processPayment
};