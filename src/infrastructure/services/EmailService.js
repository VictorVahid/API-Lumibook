// src/infrastructure/services/EmailService.js
require("dotenv").config();
const nodemailer = require("nodemailer");
const emailTemplates = require("./emailTemplates");

// validação das ENV
[
	"EMAIL_HOST",
	"EMAIL_PORT",
	"EMAIL_USER",
	"EMAIL_PASSWORD",
	"EMAIL_FROM",
].forEach((k) => {
	if (!process.env[k]) throw new Error(`Missing env ${k}`);
});

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

	async send(templateName, recipient, data) {
		// ...
	}
}

module.exports = new EmailService();
