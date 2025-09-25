import { verifyToken } from '../helpers/jwt.js';

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No autenticado' });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ message: 'Token inválido' });

  req.user = decoded;
  next();
};
