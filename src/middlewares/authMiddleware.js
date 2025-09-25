import { verifyToken } from '../helpers/jwt.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No autorizado, falta token' });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ message: 'Token inválido' });

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error en autenticación', error: error.message });
  }
};
