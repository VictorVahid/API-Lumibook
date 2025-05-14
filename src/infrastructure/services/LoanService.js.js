const MongooseReservationRepository = require("../mongoose/repositories/MongooseReservationRepository");

class LoanService {
	constructor() {
		// Instancia o repositório Mongoose para reservas/empréstimos
		this.repository = new MongooseReservationRepository();
	}

	/**
	 * Busca um empréstimo pelo ID e retorna no formato esperado pelos use cases
	 * @param {string} loanId
	 * @returns {Promise<{
	 *   id: string,
	 *   dueDate: Date,
	 *   user: { email: string, name: string },
	 *   item: { title: string }
	 * } | null>}
	 */
	async getLoanById(loanId) {
		if (!loanId) {
			throw new Error("Loan ID é obrigatório");
		}

		// Busca o documento pelo ID
		const doc = await this.repository.findById(loanId);
		if (!doc) {
			return null;
		}

		// Mapeia para o formato de domínio
		return {
			id: doc._id.toString(),
			dueDate: doc.dataReserva,
			user: {
				email: doc.usuario.email,
				name: doc.usuario.nome,
			},
			item: {
				title: doc.livro.titulo,
			},
		};
	}
}

module.exports = LoanService;
