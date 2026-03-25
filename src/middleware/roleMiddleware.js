module.exports = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({ status: 'error', message: 'Middleware d\'autenticació necessari abans del de rols' });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ status: 'error', message: 'Accés prohibit: no tens el rol necessari' });
        }
        
        next();
    };
};
