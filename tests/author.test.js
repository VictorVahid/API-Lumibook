const requestAuthor = require("supertest");
const appAuthor = require("../src/app");

describe("Author API", () => {
	it("POST /api/autores — create author", async () => {
		const payload = { nome: "José" };
		const res = await requestAuthor(appAuthor)
			.post("/api/autores")
			.send(payload)
			.expect(201);
		expect(res.body).toHaveProperty("id");
		expect(res.body.nome).toBe(payload.nome);
	});

	it("GET /api/autores — list authors", async () => {
		const res = await requestAuthor(appAuthor).get("/api/autores").expect(200);
		expect(Array.isArray(res.body)).toBe(true);
	});
});
