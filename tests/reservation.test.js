const requestRes = require("supertest");
const appRes = require("../src/app");

describe("Reservation API", () => {
	it("POST /api/reservas — create reservation", async () => {
		// create user and book first
		const u = await requestRes(appRes)
			.post("/api/usuarios")
			.send({ nome: "U", email: "u@u.com", senha: "123456" });
		const b = await requestRes(appRes)
			.post("/api/books")
			.send({ title: "T", author: "A", price: 10, stock: 1 });
		const payload = { usuarioId: u.body.id, livroId: b.body.id };
		const res = await requestRes(appRes)
			.post("/api/reservas")
			.send(payload)
			.expect(201);
		expect(res.body).toHaveProperty("id");
	});
});
