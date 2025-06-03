// Middleware para permitir acesso apenas a admin
module.exports = function requireAdmin(req, res, next) {
  if (!req.user || req.user.papel !== 'admin') {
    return res.status(403).json({ message: 'Apenas admin pode realizar esta ação.' });
  }
  next();
}; 