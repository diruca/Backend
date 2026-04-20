const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Funcions CRUD existents
const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const getAllUsers = async () => {
    return await User.find().select('-password');
};

const getUserById = async (userId) => {
    return await User.findById(userId).select('-password');
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { 
        new: true,
        runValidators: true 
    }).select('-password');
};

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

// Funcions d'autenticació
const registerUser = async (name, email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('El email ya está registrado');
    }
    
    const user = new User({ name, email, password });
    return await user.save();
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Credenciales incorrectas');
    }
    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new Error('Credenciales incorrectas');
    }
    
    const token = jwt.sign(
        { 
            userId: user._id, 
            email: user.email,
            role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        return user;
    } catch (error) {
        throw new Error('Token inválido');
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    registerUser,  
    loginUser,  
    verifyToken 
};