const productService = require('../services/productService');

// CREATE - Crear producto
const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ status: 'success', data: product });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// READ - Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({ status: 'success', data: products });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// READ - Obtener producto por ID
const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
        res.status(200).json({ status: 'success', data: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// UPDATE - Actualizar producto
const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
        res.status(200).json({ status: 'success', data: product });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// DELETE - Eliminar producto
const deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
        res.status(200).json({ status: 'success', message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};