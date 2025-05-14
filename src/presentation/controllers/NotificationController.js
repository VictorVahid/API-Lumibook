const SendReminder = require("../../usecases/sendReminder");

class NotificationController {
	constructor() {
		this.sendReminder = new SendReminder();
	}

	async sendLoanReminder(req, res) {
		try {
			const { loanId } = req.params;
			// Supondo que existe um LoanService para buscar o empréstimo
			const loan = await LoanService.getLoanById(loanId);

			await this.sendReminder.execute(loan);

			res.json({ success: true });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new NotificationController();
