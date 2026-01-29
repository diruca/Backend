const Payment = require('../models/Payment');

const createPayment = async (paymentData) => {
    const payment = new Payment(paymentData);
    return await payment.save();
};

const getAllPayments = async () => {
    return await Payment.find().populate('order', 'total status');
};

const getPaymentById = async (paymentId) => {
    return await Payment.findById(paymentId).populate('order');
};

const getPaymentsByOrder = async (orderId) => {
    return await Payment.find({ order: orderId }).populate('order');
};

const updatePaymentStatus = async (paymentId, status) => {
    return await Payment.findByIdAndUpdate(
        paymentId, 
        { status }, 
        { new: true, runValidators: true }
    );
};

const processPayment = async (paymentId, transactionData) => {
    return await Payment.findByIdAndUpdate(
        paymentId,
        { 
            status: 'completed',
            transactionId: transactionData.transactionId 
        },
        { new: true }
    );
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    getPaymentsByOrder,
    updatePaymentStatus,
    processPayment
};