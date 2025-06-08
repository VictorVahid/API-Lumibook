class Estatistica {
	constructor({ usuario, valores }) {
		if (!usuario) throw new Error("Usuário é obrigatório");

		this.usuario = usuario;
		this.valores = {
			livrosLidos: valores?.livrosLidos ?? 0,
			reservasRealizadas: valores?.reservasRealizadas ?? 0,
			atrasos: valores?.atrasos ?? 0,
		};
	}

	atualizarEstatistica(chave, valor) {
		if (!this.valores.hasOwnProperty(chave)) {
			throw new Error(`Estatística "${chave}" não é válida.`);
		}
		this.valores[chave] = valor;
	}
}

module.exports = Estatistica;
