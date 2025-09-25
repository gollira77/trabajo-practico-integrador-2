export const ownerOrAdminMiddleware = (getOwnerId) => {
  return (req, res, next) => {
    if (req.user?.role === 'admin' || req.user?.id === getOwnerId(req)) {
      return next();
    }
    return res.status(403).json({ message: 'Acceso denegado, no eres propietario ni administrador' });
  };
};
