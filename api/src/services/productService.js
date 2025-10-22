const Product = require('../models/Product');

const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

const getAllProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const updateProduct = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { 
        new: true,
        runValidators: true 
    });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};