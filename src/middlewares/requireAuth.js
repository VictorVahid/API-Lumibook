const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, data: null, error: 'Token não fornecido.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, data: null, error: 'Token inválido ou expirado.' });
  }
}; 