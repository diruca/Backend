const User = require('../models/user');

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const getAllUsers = async () => {
    return await User.find().select('-password'); // Excluir contraseña
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

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};