const requestFine = require("supertest");
const appFine = require("../src/app");

describe("Fine API", () => {
	it("POST /api/multas — issue fine", async () => {
		// create user and reservation first
		const u = await requestFine(appFine)
			.post("/api/usuarios")
			.send({ nome: "U", email: "u@instituicao.edu", senha: "Senha@123" });
		const b = await requestFine(appFine)
			.post("/api/books")
			.send({ title: "T", author: "A", price: 10, stock: 1 });
		const r = await requestFine(appFine)
			.post("/api/reservas")
			.send({ usuarioId: u.body.id, livroId: b.body.id, exemplarId: "ex1", dataReserva: new Date().toISOString() });
		const payload = { usuarioId: u.body.id, reservaId: r.body.id, valor: 20, status: "pendente" };
		const res = await requestFine(appFine)
			.post("/api/multas")
			.send(payload)
			.expect(201);
		expect(res.body).toHaveProperty("id");
	});
});
