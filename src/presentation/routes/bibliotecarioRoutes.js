const express = require('express');
const router = express.Router();
const { createBibliotecario } = require('../controllers/BibliotecarioController');
const requireAuth = require('../../middlewares/requireAuth');
const requireAdmin = require('../../middlewares/requireAdmin');

// Endpoint protegido: apenas admin pode cadastrar bibliotecário
router.post('/bibliotecarios', requireAuth, requireAdmin, createBibliotecario);

module.exports = router; 