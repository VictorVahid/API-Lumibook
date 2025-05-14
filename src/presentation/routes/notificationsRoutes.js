// src/presentation/routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");

// POST /api/notifications/loans/:loanId/reminder
router.post(
	"/loans/:loanId/reminder",
	NotificationController.sendLoanReminder.bind(NotificationController)
);

module.exports = router;
