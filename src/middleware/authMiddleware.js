const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 'error', message: 'Token no proporcionat' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Usuari no trobat' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ status: 'error', message: 'Token invàlid o expirat' });
    }
};

module.exports = authMiddleware;
