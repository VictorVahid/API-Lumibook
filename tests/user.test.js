const requestUser = require("supertest");
const appUser = require("../src/app");

describe("User API", () => {
	it("POST /api/usuarios — create user", async () => {
		const payload = { nome: "User", email: "u@instituicao.edu", senha: "Senha@123" };
		const res = await requestUser(appUser)
			.post("/api/usuarios")
			.send(payload)
			.expect(201);
		expect(res.body).toHaveProperty("id");
		expect(res.body.email).toBe(payload.email);
	});

	it("GET /api/usuarios/:id — get user", async () => {
		const u = await requestUser(appUser)
			.post("/api/usuarios")
			.send({ nome: "User", email: "u2@instituicao.edu", senha: "Senha@123" });
		const res = await requestUser(appUser).get(`/api/usuarios/${u.body.id}`).expect(200);
		expect(res.body).toHaveProperty("id");
	});
});
