class Loan {
	constructor({
		id,
		livroId,
		itens,
		dataEmprestimo,
		dataPrevistaDevolucao,
		userId,
		status,
	}) {
		this.id = id;
		this.livroId = livroId;
		this.itens = itens || [];
		this.dataEmprestimo = dataEmprestimo;
		this.dataPrevistaDevolucao = dataPrevistaDevolucao;
		this.userId = userId;
		this.status = status || "ativo"; // exemplo: ativo, devolvido, atrasado
		this.validate();
	}

	validate() {
		if (!this.livroId)
			throw new Error("Livro relacionado ao empréstimo é obrigatório");
		if (!Array.isArray(this.itens))
			throw new Error("Itens deve ser uma lista de exemplares");
		if (!this.dataEmprestimo)
			throw new Error("Data do empréstimo é obrigatória");
		if (!this.dataPrevistaDevolucao)
			throw new Error("Data prevista para devolução é obrigatória");
	}
}

module.exports = Loan;
