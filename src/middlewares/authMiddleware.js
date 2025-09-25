import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No autorizado, falta token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardamos payload del usuario
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
