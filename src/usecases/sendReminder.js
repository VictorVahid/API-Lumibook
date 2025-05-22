// src/usecases/sendReminder.js
const SendNotification = require("./sendNotification");

class SendReminder {
	/**
	 * @param {SendNotification} sendNotification
	 */
	constructor(sendNotification) {
		if (!sendNotification) throw new Error("SendNotification é obrigatório");
		this.sendNotification = sendNotification;
	}

	/**
	 * @param {Object} loan – deve conter { user: { email, name }, item: { title }, dueDate: Date }
	 */
	async execute(loan) {
		if (!loan?.user?.email || !loan?.item?.title || !loan?.dueDate) {
			throw new Error("Loan inválido para envio de lembrete");
		}

		const payload = {
			userName: loan.user.name,
			itemTitle: loan.item.title,
			dueDate: loan.dueDate.toLocaleDateString("pt-BR"),
		};

		return this.sendNotification.execute(
			"loanReminder",
			loan.user.email,
			payload
		);
	}
}

module.exports = SendReminder;
