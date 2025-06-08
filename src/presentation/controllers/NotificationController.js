// src/presentation/controllers/NotificationController.js

// Controller responsável por notificações e lembretes relacionados a empréstimos
const SendReminder = require("../../domain/usecases/sendReminder.js");
const SendNotification = require("../../domain/usecases/sendNotification.js");
const LoanService = require("../../infrastructure/services/LoanService.js");

class NotificationController {
	constructor() {
		// Instancia os serviços de notificação e lembrete
		const sendNotification = new SendNotification();
		this.sendReminder = new SendReminder(sendNotification);
		this.loanService = new LoanService();
	}

	// Envia lembrete de devolução de empréstimo para o usuário
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
