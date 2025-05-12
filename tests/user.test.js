const requestUser = require("supertest");
const appUser = require("../src/app");

describe("User API", () => {
	it("POST /api/usuarios — create user", async () => {
		const payload = { nome: "User", email: "u@u.com", senha: "123456" };
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
			.send({ nome: "User", email: "u@u2.com", senha: "123456" });
		await requestUser(appUser).get(`/api/usuarios/${u.body.id}`).expect(200);
	});
});
