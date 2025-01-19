const { verifyJWT } = require('../utils/auth.util');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ message: 'No token provided or invalid format' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyJWT(token); 

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        req.userId = decoded.userId;
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Failed to authenticate token', error: error.message });
    }
};

const authResetPasssMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ message: 'No token provided or invalid format' });
        }

        const authToken = authHeader.split(' ')[1];
        const decoded = verifyJWT(authToken); 

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        req.userId = decoded.userId;
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Failed to authenticate token', error: error.message });
    }
};

module.exports = {authMiddleware,authResetPasssMiddleware};
