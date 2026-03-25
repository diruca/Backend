const Product = require('../models/Product');

const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

const getAllProducts = async (filters = {}) => {
    const query = {};

    // Filtre per categoria
    if (filters.category) {
        query.category = filters.category;
    }

    // Filtre per marca
    if (filters.brand) {
        query.brand = filters.brand;
    }

    // Filtre per rang de preus
    if ((filters.minPrice && filters.minPrice !== '') || (filters.maxPrice && filters.maxPrice !== '')) {
        query.price = {};
        if (filters.minPrice && filters.minPrice !== '') query.price.$gte = Number(filters.minPrice);
        if (filters.maxPrice && filters.maxPrice !== '') query.price.$lte = Number(filters.maxPrice);
    }

    // Filtre per característiques (features)
    if (filters.appleCarPlay === 'true') query['features.appleCarPlay'] = true;
    if (filters.androidAuto === 'true') query['features.androidAuto'] = true;
    if (filters.bluetooth === 'true') query['features.bluetooth'] = true;
    if (filters.touchscreen === 'true') query['features.touchscreen'] = true;
    if (filters.navigation === 'true') query['features.navigation'] = true;

    return await Product.find(query);
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