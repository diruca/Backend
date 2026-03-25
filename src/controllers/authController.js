const User = require('../models/User');
const authService = require('../services/authService');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Verificar que l'email no existeix
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'L\'email ja està registrat' });
        }

        // 2. Hashejar la contrasenya 
        // 3. Guardar usuari a MongoDB
        const user = new User({ name, email, password, role });
        await user.save();

        res.status(201).json({
            status: 'success',
            message: 'Usuari registrat correctament',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar usuari per email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Credencials incorrectes' });
        }

        // 2. Comparar contrasenya amb bcrypt
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Credencials incorrectes' });
        }

        // 3. Generar access token
        const accessToken = authService.generateAccessToken(user);

        // 4. Generar refresh token
        const refreshToken = authService.generateRefreshToken(user);

        // 5. Guardar refresh token a MongoDB
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            status: 'success',
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ status: 'error', message: 'Refresh token és necessari' });
        }

        // 1. Es vàlida el refresh token
        const decoded = authService.verifyRefreshToken(refreshToken);
        if (!decoded) {
            return res.status(403).json({ status: 'error', message: 'Refresh token invàlid o expirat' });
        }

        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ status: 'error', message: 'Refresh token no vàlid' });
        }

        // 2. Es genera un nou access token
        const accessToken = authService.generateAccessToken(user);

        res.status(200).json({
            status: 'success',
            accessToken
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        // Eliminar refresh token associat a l’usuari
        const user = await User.findById(req.user._id);
        if (user) {
            user.refreshToken = null;
            await user.save();
        }

        res.status(200).json({ status: 'success', message: 'Sessió tancada correctament' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    register,
    login,
    refresh,
    logout
};
