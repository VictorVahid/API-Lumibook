const nodemailer = require('nodemailer');
const emailTemplates = require('./emailTemplates');
const dotenv = require('dotenv');

dotenv.config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 10000,
    });
  }

  async send(templateName, recipient, data) {
    const template = emailTemplates[templateName];
    if (!template) {
      throw new Error(`Template ${templateName} não encontrado`);
    }

    const { subject, html } = this.renderTemplate(template, data);

    try {
      await this.transporter.sendMail({
        from: `"Lumibook" <${process.env.EMAIL_FROM}>`,
        to: recipient,
        subject,
        html,
      });

      return true;
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw error;
    }
  }

  renderTemplate(template, data) {
    const replacePlaceholders = (str) => str.replace(/\${([^}]+)}/g, (match, key) => data[key] || match);

    return {
      subject: replacePlaceholders(template.subject),
      html: replacePlaceholders(template.html),
    };
  }
}

module.exports = new EmailService();
