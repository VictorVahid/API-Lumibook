const requestRes = require("supertest");
const appRes = require("../src/app");

describe("Reservation API", () => {
	it("POST /api/reservas — create reservation", async () => {
		// create user and book first
		const u = await requestRes(appRes)
			.post("/api/usuarios")
			.send({ nome: "U", email: "u@instituicao.edu", senha: "Senha@123" });
		const b = await requestRes(appRes)
			.post("/api/books")
			.send({ title: "T", author: "A", price: 10, stock: 1 });
		const payload = { usuarioId: u.body.id, livroId: b.body.id, exemplarId: "ex1", dataReserva: new Date().toISOString() };
		const res = await requestRes(appRes)
			.post("/api/reservas")
			.send(payload)
			.expect(201);
		expect(res.body).toHaveProperty("usuarioId");
	});
});
