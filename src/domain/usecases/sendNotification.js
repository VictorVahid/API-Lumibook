// src/usecases/sendNotification.js

// Caso de uso para envio de notificações por e-mail
const EmailService = require("../../infrastructure/services/EmailService");
// Importa o modelo de domínio Notification
const Notification = require("../models/Notification");

class SendNotification {
	/**
	 * @param {object} [emailService] - implementação concreta ou mock para testes
	 */
	constructor(emailService = EmailService) {
		this.emailService = emailService;
	}

	/**
	 * Executa o envio de uma notificação por e-mail
	 * @param {string} type - nome do template (ex: 'loanReminder')
	 * @param {string} recipient - e-mail do destinatário
	 * @param {object} data - payload com dados para o template
	 * @returns {Promise<Notification>}
	 */
	async execute(type, recipient, data) {
		// Cria a entidade Notification no estado inicial
		const notification = new Notification({
			type,
			recipient,
			content: data,
		});

		try {
			// Dispara o e-mail usando EmailService
			await this.emailService.send(type, recipient, data);
			// Marca como enviado ao sucesso
			notification.markAsSent();
			return notification;
		} catch (error) {
			// Marca como falhado em caso de erro
			notification.markAsFailed();
			throw error;
		}
	}
}

module.exports = SendNotification;
