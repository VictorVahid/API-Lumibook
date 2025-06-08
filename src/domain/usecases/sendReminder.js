// src/usecases/sendReminder.js
// Caso de uso para envio de lembretes de devolução de empréstimos
const SendNotification = require("./sendNotification");

class SendReminder {
	// Recebe uma instância de SendNotification (injeção de dependência)
	constructor(sendNotification) {
		if (!sendNotification) throw new Error("SendNotification é obrigatório");
		this.sendNotification = sendNotification;
	}

	// Executa o envio do lembrete para o usuário do empréstimo
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
