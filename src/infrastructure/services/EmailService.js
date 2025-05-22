// src/infrastructure/services/EmailService.js
require("dotenv").config();
const nodemailer = require("nodemailer");
const emailTemplates = require("./emailTemplates");

// validação das ENV
if (
	!process.env.EMAIL_HOST ||
	!process.env.EMAIL_PORT ||
	!process.env.EMAIL_USER ||
	!process.env.EMAIL_PASSWORD ||
	!process.env.EMAIL_FROM
) {
	throw new Error("Missing email env variables");
}

class EmailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: +process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
			tls: { rejectUnauthorized: false },
			connectionTimeout: 10000,
		});
	}

	async send(templateName, toAddress, data) {
		const template = emailTemplates[templateName];

		if (!template) {
			throw new Error(`Template '${templateName}' not found`);
		}

		const html = template.html.replace(/\${(\w+)}/g, (match, key) => data[key]);

		const message = {
			from: process.env.EMAIL_FROM,
			to: toAddress,
			subject: template.subject.replace(/\${(\w+)}/g, (match, key) => data[key]),
			html,
		};

		await this.transporter.sendMail(message);
	}
}

module.exports = new EmailService();
