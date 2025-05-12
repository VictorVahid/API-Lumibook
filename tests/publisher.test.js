const requestPub = require("supertest");
const appPub = require("../src/app");

describe("Publisher API", () => {
	it("POST /api/editoras — create publisher", async () => {
		const payload = { nome: "Editora XYZ" };
		const res = await requestPub(appPub)
			.post("/api/editoras")
			.send(payload)
			.expect(201);
		expect(res.body).toHaveProperty("id");
		expect(res.body.nome).toBe(payload.nome);
	});

	it("GET /api/editoras — list publishers", async () => {
		const res = await requestPub(appPub).get("/api/editoras").expect(200);
		expect(Array.isArray(res.body)).toBe(true);
	});
});
