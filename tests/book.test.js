const requestBook = require("supertest");
const appBook = require("../src/app");

describe("Books API", () => {
	it("POST /api/books — should create a book", async () => {
		const payload = {
			title: "Node.js CA",
			author: "Fulano",
			stock: 5,
		};
		const res = await requestBook(appBook)
			.post("/api/books")
			.send(payload)
			.expect(201);
		expect(res.body).toHaveProperty("id");
		expect(res.body.titulo).toBe(payload.title);
	});

	it("GET /api/books — should return empty array initially", async () => {
		const res = await requestBook(appBook).get("/api/books").expect(200);
		expect(Array.isArray(res.body)).toBe(true);
	});
});
