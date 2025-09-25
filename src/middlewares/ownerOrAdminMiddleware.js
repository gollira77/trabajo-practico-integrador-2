export const ownerOrAdminMiddleware = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      const resourceOwnerId = await getResourceOwnerId(req);
      if (req.user.id !== resourceOwnerId && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso prohibido: no eres el propietario ni admin' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error en autorización', error: error.message });
    }
  };
};
