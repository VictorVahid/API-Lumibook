const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');

// Enviar lembrete manualmente
router.post('/loans/:loanId/reminder', NotificationController.sendLoanReminder);

module.exports = router;