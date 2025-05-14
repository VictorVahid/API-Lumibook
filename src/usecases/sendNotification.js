const EmailService = require("../../src/infrastructure/services/EmailService");
const Notification = require("../../src/domain/models/Notification");
class SendNotification {
	async execute(type, recipient, data) {
		const notification = new Notification({
			type,
			recipient,
			content: data,
		});

		try {
			await EmailService.send(type, recipient, data);
			notification.markAsSent();
			return notification;
		} catch (error) {
			notification.markAsFailed();
			throw error;
		}
	}
}

module.exports = SendNotification;
