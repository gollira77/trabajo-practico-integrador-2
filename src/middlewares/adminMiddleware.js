export const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso prohibido: solo admins' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error en autorización', error: error.message });
  }
};
