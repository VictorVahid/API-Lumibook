const requestEx = require("supertest");
const appEx = require("../src/app");

describe("Exemplar API", () => {
	it("POST /api/exemplares — create exemplar", async () => {
		// assume a book exists
		const bookRes = await requestEx(appEx)
			.post("/api/books")
			.send({ title: "Teste", author: "X", stock: 1 });
		const bookId = bookRes.body.id;
		const payload = { livroId: bookId, status: "disponível" };
		const res = await requestEx(appEx)
			.post("/api/exemplares")
			.send(payload)
			.expect(201);
		expect(res.body).toHaveProperty("id");
	});

	it("GET /api/exemplares — list exemplars", async () => {
		const res = await requestEx(appEx).get("/api/exemplares").expect(200);
		expect(Array.isArray(res.body)).toBe(true);
	});
});
