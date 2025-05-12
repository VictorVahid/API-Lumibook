class Reservation {
	constructor({ id, usuarioId, livroId, status, dataReserva }) {
		this.id = id;
		this.usuarioId = usuarioId;
		this.livroId = livroId;
		this.status = status;
		this.dataReserva = dataReserva;
		this.validate();
	}

	validate() {
		if (!this.usuarioId) throw new Error("usuarioId é obrigatório");
		if (!this.livroId) throw new Error("livroId é obrigatório");
		if (!this.status) throw new Error("status é obrigatório");
	}
}
module.exports = Reservation;
