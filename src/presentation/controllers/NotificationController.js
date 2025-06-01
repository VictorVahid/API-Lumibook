// src/presentation/controllers/NotificationController.js

const SendReminder = require("../../usecases/sendReminder");
const SendNotification = require("../../usecases/sendNotification");
const LoanService = require("../../infrastructure/services/LoanService.js");

class NotificationController {
	constructor() {
		const sendNotification = new SendNotification();
		this.sendReminder = new SendReminder(sendNotification);
		this.loanService = new LoanService();
	}

	async sendLoanReminder(req, res, next) {
		try {
			const { loanId } = req.params;
			if (!loanId)
				return res.status(400).json({ message: "loanId é obrigatório" });

			const loan = await this.loanService.getLoanById(loanId);
			if (!loan)
				return res.status(404).json({ message: "Empréstimo não encontrado" });

			await this.sendReminder.execute(loan);
			return res.status(200).json({ success: true });
		} catch (err) {
			return next(err);
		}
	}
}

module.exports = new NotificationController();
