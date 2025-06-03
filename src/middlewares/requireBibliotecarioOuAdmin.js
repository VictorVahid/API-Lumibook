// Middleware para permitir acesso apenas a admin ou bibliotecário
module.exports = function requireBibliotecarioOuAdmin(req, res, next) {
  if (!req.user || !['admin', 'bibliotecario'].includes(req.user.papel)) {
    return res.status(403).json({ message: 'Apenas bibliotecário ou admin pode realizar esta ação.' });
  }
  next();
}; 