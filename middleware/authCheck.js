import jwt from 'jsonwebtoken'
const authCheck = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split('')[1];
    try {
        const decode = jwt.verify(token, process.env.SECRETE_KEY);
        req.user = decode;
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
}

export { authCheck }; 