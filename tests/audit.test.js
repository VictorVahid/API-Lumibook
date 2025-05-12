const request = require("supertest");
const app = require("../src/app");

describe("AuditLog API", () => {
	it("should list logs (empty by default)", async () => {
		const res = await request(app).get("/api/auditoria/logs").expect(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBe(0);
	});

	it("should return 404 for non-existent log", async () => {
		await request(app)
			.get("/api/auditoria/logs/507f1f77bcf86cd799439011")
			.expect(404);
	});
});
