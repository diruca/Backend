const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    features: {
        appleCarPlay: { type: Boolean, default: false },
        androidAuto: { type: Boolean, default: false },
        bluetooth: { type: Boolean, default: false },
        touchscreen: { type: Boolean, default: false },
        screenSize: { type: Number },
        navigation: { type: Boolean, default: false }
    },
    compatibility: [String],
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);