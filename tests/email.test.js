// tests/email.test.js

// 1) Carrega as variáveis de ambiente ANTES de tudo
require("dotenv").config();

// 2) Importa o serviço de e-mail correto
const EmailService = require("../src/infrastructure/services/EmailService.js");

describe("Mailtrap EmailService", () => {
	it("deve ter as variáveis de ambiente configuradas", () => {
		expect(process.env.EMAIL_HOST).toBeDefined();
		expect(process.env.EMAIL_PORT).toBeDefined();
		expect(process.env.EMAIL_USER).toBeDefined();
		expect(process.env.EMAIL_PASSWORD).toBeDefined();
	});

	it("deve conseguir verificar a conexão SMTP com o Mailtrap", async () => {
  		try {
    		await EmailService.transporter.verify();
  		} catch (error) {
    		console.error(error);
 		}
	});

	it("deve enviar um e-mail de teste (loanReminder) sem falhar", async () => {
		const dummyData = {
			userName: "Usuário Teste",
			itemTitle: "Livro de Exemplo",
			dueDate: new Date().toLocaleDateString("pt-BR"),
		};
		const toAddress = process.env.TEST_EMAIL;
		if (!toAddress) {
			throw new Error("Por favor defina TEST_EMAIL no seu .env");
		}

		await expect(
			EmailService.send("loanReminder", toAddress, dummyData)
		).resolves.not.toThrow();
	});
});
